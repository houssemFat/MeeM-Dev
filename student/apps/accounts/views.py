from django.views.generic.edit import FormView
from django.shortcuts import redirect
from django.core.urlresolvers import reverse, reverse_lazy
from django.contrib import auth
from django.views.generic.base import TemplateResponseMixin, View
from django.http import Http404

from core.apps.tools.common import dump_and_render_json, error_form_serialization
from core.apps.accounts import tools
from core.apps.accounts.models import EmailConfirmation


from . import forms 

import sys


from .forms import StudentCreationForm


# FIXME


########################
# LOGIN PROCESS #
########################


from django.contrib import auth

def login(request):
    if request.method == 'POST':
        login = request.POST.get('login', '')
        password = request.POST.get('password', '')
        user = auth.authenticate(email=login, password=password)
        message = {}
        if user is not None and user.is_active:
            # Correct password, and the user is marked "active"
            auth.login(request, user)
            # Redirect to a success page.
            message.update({'satus': 'OK'})
        else:
            # Show an error page
            message.update({'status': 'Error'})
    else :
        message.update({'satus': 'False' })
        message.update({'message': 'Unknown request'})
    
    return dump_and_render_json(request, message)


def register(request):
    message = {}
    if request.method == 'POST':
        form = StudentCreationForm(request.POST)
        if form.is_valid():
            new_user = form.save(request)
            message.update({'satus': 'OK', 'auth_type' : new_user.auth_type})
            message.update({'message': 'welcome'})
            if (new_user.auth_type == new_user.PHONE):
                from django.core.urlresolvers import reverse
                message.update({'comfirmUrl': request.build_absolute_uri(reverse("account_student_confirm_sms", args=[request.session['phone_verification']]))})
        else:
            # Show an error page
            message.update({'status': 'Error'})
            message.update({'message': error_form_serialization (form.errors)})
    else :   
        message.update({'satus': 'Error' })
        message.update({'message': 'Unknown request'})
    
    return dump_and_render_json(request, message)     

def social_login (): 
        return ""

class ConfirmEmailView(TemplateResponseMixin, View):
    def get_template_names(self):
        if self.object == None :
            return ["404.html"]
        else:
            return ["accounts/student/email_confirm.html"]

    def get(self, *args, **kwargs):
        try:
            self.object = confirmation = self.get_object()
            confirm_pass = confirmation.confirm(self.request)
            if confirm_pass:
                user = confirmation.email_address.user
                user.is_active = True
                user.save ()
            redirect_url = self.get_redirect_url()
            if  redirect_url:
                return redirect(redirect_url)
        except Http404:
            self.object = None
        ctx = self.get_context_data()
        return self.render_to_response(ctx)

    def get_object(self, queryset=None):
        if queryset is None:
            queryset = self.get_queryset()
        try:
            return queryset.get(key=self.kwargs["key"].lower())
        except EmailConfirmation.DoesNotExist:
            raise Http404()

    def get_queryset(self):
        queryset = EmailConfirmation.objects.all_valid()
        queryset = queryset.select_related("email_address__user")
        return queryset

    def get_context_data(self, **kwargs):
        ctx = kwargs
        ctx["confirmation"] = self.object
        return ctx

    def get_redirect_url(self):
        from .tools import get_email_confirmation_redirect_url
        return get_email_confirmation_redirect_url(self.request)

confirm_email = ConfirmEmailView.as_view()

class ConfirmSMSView(TemplateResponseMixin, View):
    def get_template_names(self):
        if self.request.method == 'POST':
            return ["accounts/teacher/email_confirmed.html"]
        else:
            return ["accounts/teacher/email_confirm.html"]

    def get(self, *args, **kwargs):
        try:
            self.object = self.get_object()
        except Http404:
            self.object = None
        ctx = self.get_context_data()
        return self.render_to_response(ctx)

    def get_object(self, queryset=None):
        if queryset is None:
            queryset = self.get_queryset()
        try:
            return queryset.get(key=self.kwargs["key"].lower())
        except EmailConfirmation.DoesNotExist:
            raise Http404()

    def get_queryset(self):
        qs = EmailConfirmation.objects.all_valid()
        qs = qs.select_related("email_address__user")
        return qs

    def get_context_data(self, **kwargs):
        ctx = kwargs
        ctx["confirmation"] = self.object
        return ctx

    def get_redirect_url(self):
        adapter = get_helper()
        return adapter().get_email_confirmation_redirect_url(self.request)

confirm_sms_account = ConfirmSMSView.as_view()

class PasswordResetView(FormView):
    template_name = "account/password_reset.html"
    form_class = forms.ResetPasswordForm
    success_url = reverse_lazy("account_reset_password")

    def form_valid(self, form):
        form.save()
        return super(PasswordResetView, self).form_valid(form)

    def get_context_data(self, **kwargs):
        ret = super(PasswordResetView, self).get_context_data(**kwargs)
        # NOTE: For backwards compatibility
        ret['password_reset_form'] = ret.get('form')
        # (end NOTE)
        return ret

password_reset = PasswordResetView.as_view()
