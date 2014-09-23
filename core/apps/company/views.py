from django.views.generic.edit import FormView
from django.shortcuts import redirect
from django.shortcuts import render
from django.contrib import messages
from django.utils.translation import ugettext_lazy as _
from core.apps.tools.common import  render_json, json_dump_meemencoder,\
    MeeMJSONEncoder

import json

from forms import ContactUsForm

def get_user_data (request):
    model = {}
    if request.user.is_authenticated ():
        from django.forms.models import model_to_dict
        model = model_to_dict(request.user, ['username', 'email'])
    return model
# Create your views here.
class ContactUsView(FormView):
    form_class = ContactUsForm
    template_name = "company/contact_us.html"
    redirect_field_name = "next"
    success_url = "/"
    def form_valid(self, form):
        try :
            contact = form.save(self.request)
            request = self.request
            messages.success(request, _('Thank You, your Message has been sent, we will sent you a reponse as possible !'))
            if request.is_ajax():
                return render_json(request, json_dump_meemencoder (self.request, contact))
            redirect_to = request.POST.get("next")
            self.success_url = request.POST.get("success")
            # #FIXME
            if not redirect_to or " " in redirect_to or redirect_to.startswith("http"):
                redirect_to = self.success_url
            return redirect(redirect_to)
        except BaseException, e:
            return e

contact_us = ContactUsView.as_view()


def business(request):
    model = get_user_data (request)
    return render(request, 'company/business.html', { 'userdata' : json.dumps(model, encoding="utf-8", cls = MeeMJSONEncoder)})

def terms_of_use(request):
    model = get_user_data (request)
    return render(request, 'company/terms_of_use.html', { 'userdata' : json.dumps(model, encoding="utf-8", cls = MeeMJSONEncoder)})
 
def privacy(request):
    model = get_user_data (request)
    return render(request, 'company/privacy.html', { 'userdata' : json.dumps(model, encoding="utf-8", cls = MeeMJSONEncoder)})

def team(request):
    model = get_user_data (request)
    return render(request, 'company/team.html', { 'userdata' : json.dumps(model, encoding="utf-8", cls = MeeMJSONEncoder)})


