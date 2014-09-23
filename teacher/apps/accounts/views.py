# Create your views here.
from django.views.generic.edit import FormView
from django.core.urlresolvers import reverse, reverse_lazy
from django.shortcuts import  get_object_or_404, redirect
from django.views.generic.base import TemplateResponseMixin, View, TemplateView
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import base36_to_int
from django.contrib import messages
from django.http import Http404


from core.apps.accounts.models import User, EmailConfirmation

from . import forms
from .tools import complete_signup
from core.apps.accounts import tools


########################
# LOGIN PROCESS #
########################


class LoginView(FormView):
    form_class = forms.LoginForm
    template_name = "taccount/login.html"
    success_url = "/teacher"
    redirect_field_name = "next"

    def form_valid(self, form):
        success_url = self.get_success_url()
        return form.login(self.request, redirect_url=success_url)

    def get_success_url(self):
        # Explicitly passed ?next= URL takes precedence
        ret = (tools.get_next_redirect_url(self.request,
                                     self.redirect_field_name)
               or self.success_url)
        return ret

    def get_context_data(self, **kwargs):
        ret = super(LoginView, self).get_context_data(**kwargs)
        singup_url = reverse("teacher_account_singup")
        signup_url = tools.pass_through_next_redirect_url(self.request, singup_url, self.redirect_field_name)
        
        redirect_field_value = self.request.REQUEST \
            .get(self.redirect_field_name)
        ret.update({"signup_url": signup_url,
                    "redirect_field_name": self.redirect_field_name,
                    "redirect_field_value": redirect_field_value})
        return ret

login = LoginView.as_view()


    
class SignupView(FormView):
    redirect_field_name = "next"
    success_url = None

    def get_form_class(self):
        request = self.request
        if not request.user.is_authenticated():
            return forms.TeacherCreationForm
        else :
            return forms.TeacherUpgradeForm

    def get_template_names(self):
        request = self.request
        if not request.user.is_authenticated():
            return ["taccount/signup.html"]
        else :
            return ["taccount/upgrade.html"]
        
    def get_success_url(self):
        # Explicitly passed ?next= URL takes precedence
        ret = (tools.get_next_redirect_url(self.request,
                                           self.redirect_field_name)
               or self.success_url)
        return ret

    def form_valid(self, form):
        user = form.save(self.request)
        return complete_signup(self.request, user,
                                           True,
                                     self.get_success_url())
    def get_initial(self):
        return {"request" : self.request}
    
    def get_context_data(self, **kwargs):
        request = self.request
        if not request.user.is_authenticated():
            form = kwargs['form']
            form.fields["email"].initial = self.request.session \
                .get('account_verified_email', None)
            ret = super(SignupView, self).get_context_data(**kwargs)
            login_url = tools.pass_through_next_redirect_url(self.request, reverse("teacher_account_login",  urlconf="teacher.apps.accounts.urls"),
                                                            self.redirect_field_name)
            redirect_field_name = self.redirect_field_name
            redirect_field_value = self.request.REQUEST.get(redirect_field_name)
            ret.update({"login_url": login_url,
                        "redirect_field_name": redirect_field_name,
                        "redirect_field_value": redirect_field_value})
        else :
            ret = super(SignupView, self).get_context_data(**kwargs)
        return ret

register = SignupView.as_view()

class ConfirmEmailView(TemplateResponseMixin, View):
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

    def post(self, *args, **kwargs):
        self.object = confirmation = self.get_object()
        confirmation.confirm(self.request)
        # Don't -- is_active so that sys admin can
        # use it to block users et al
        #
        # user = confirmation.email_address.user
        # user.is_active = True
        # user.save()
        redirect_url = self.get_redirect_url()
        if not redirect_url:
            ctx = self.get_context_data()
            return self.render_to_response(ctx)
        
        from core.apps.tools.common import add_message
        add_message(self.request,
                                   messages.SUCCESS,
                                   'accounts/teacher/messages/email_confirmed.txt',
                                   {'email': confirmation.email_address.email})
        return redirect(redirect_url)

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
        """adapter = get_helper()"""
        return None  # adapter().get_email_confirmation_redirect_url(self.request)

confirm_email = ConfirmEmailView.as_view()


class PasswordResetView(FormView):
    form_class = forms.ResetPasswordForm
    template_name = "taccount/reset_password.html"
    success_url = reverse_lazy("teacher_account_reset_password_done")
    
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



class PasswordResetFromKeyView(FormView):
    template_name = "taccount/password_reset_from_key.html"
    form_class = forms.ResetPasswordKeyForm
    token_generator = default_token_generator
    success_url = "/teacher"  # reverse_lazy("teacher_account_reset_password_from_key_done")

    def _get_user(self, uidb36):
        # pull out user
        try:
            uid_int = base36_to_int(uidb36)
        except ValueError:
            raise Http404
        return get_object_or_404(User, id=uid_int)

    def dispatch(self, request, uidb36, key, **kwargs):
        self.uidb36 = uidb36
        self.key = key
        self.request.user = self._get_user(uidb36)
        if not self.token_generator.check_token(self.request.user, key):
            return self._response_bad_token(request, uidb36, key, **kwargs)
        else:
            return super(PasswordResetFromKeyView, self).dispatch(request,
                                                                  uidb36,
                                                                  key,
                                                                  **kwargs)

    def get_form_kwargs(self):
        kwargs = super(PasswordResetFromKeyView, self).get_form_kwargs()
        kwargs["user"] = self.request.user
        kwargs["temp_key"] = self.key
        return kwargs

    def form_valid(self, form):
        form.save()
        from core.apps.tools.common import add_message
        add_message(self.request,
                    messages.SUCCESS,
                    'account/messages/password_changed.txt')
        return super(PasswordResetFromKeyView, self).form_valid(form)

    def _response_bad_token(self, request, uidb36, key, **kwargs):
        return self.render_to_response(self.get_context_data(token_fail=True))

password_reset_from_key = PasswordResetFromKeyView.as_view()


class PasswordResetDoneView(TemplateView):
    template_name = "taccount/password_reset_done.html"

password_reset_done = PasswordResetDoneView.as_view()

