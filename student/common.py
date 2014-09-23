import datetime
import json
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.conf import settings
from django.template.context import RequestContext, Context
import os
from django.template.loader import get_template

def render(request, template_name, params = None, *args, **kwargs):
    """
    Replacement for render_to_response that uses RequestContext and sets an
    extra template variable, TEMPLATE_NAME.
    """
    dir = os.path.join(os.path.dirname(__file__), 'templates').replace('\\','/') + '/'
    template = get_template(dir + template_name)
    context_instance=RequestContext(request)
    if params is not None :
        context_instance=RequestContext(request, params)
    return HttpResponse (template.render(context_instance))
