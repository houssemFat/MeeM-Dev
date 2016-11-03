from decimal import Decimal
from datetime import datetime, date

import json

from .helper import number

import settings

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.contrib import messages
from django.template.loader import render_to_string
from django.template import TemplateDoesNotExist
from django.forms.models import model_to_dict


def models_to_dict(models, fields=None, func = None):
    list = []
    for model in models :
        data = model_to_dict(model, fields=fields)
        if func is not None :
            data.update(func(model))
        list.append(data)
    return list

def related_models_to_dict(models, related, fields=None, func = None):
    list = []
    for model in models :
        related_model = getattr(model, related)
        data = model_to_dict(related_model, fields=fields)
        if func is not None :
            data.update(func(model))
        list.append(data)
    return list

class MeeMJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        # date and datetime 
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        
        if isinstance(obj, Decimal):
            return number._number_str(obj)
            # Let the base class default method raise the TypeError
        return json.JSONEncoder.default(self, obj)
    
def json_dump_meemencoder (data):
    return json.dumps(data, encoding="utf-8", cls=MeeMJSONEncoder) 

def render(request, templateName, params = None, *args, **kwargs):
    """
    Replacement for render_to_response that uses RequestContext and sets an
    extra template variable, TEMPLATE_NAME.
    """
    #kwargs['context_instance'] = RequestContext(request)
    return render_to_response(templateName, params, context_instance=RequestContext(request))

def error_form_serialization(errors):  
    """  
    This method strips the proxy objects from the error dict and casts  
    them to unicode. After that the error dict can and will be  
    json-serialized.  
    """  
    plain_dict = dict([(k, [unicode(e) for e in v]) for k,v in errors.items()])
        
    return json.dumps(plain_dict)

#send  data as json 
def dump_and_render_json(request, data):
    return render_json(request, json.dumps(data, encoding="utf-8", cls=MeeMJSONEncoder))
# send json data add mimeType json 
def render_json (request, data):
    return HttpResponse(data, content_type="application/json")


def add_message(request, level, message_template,
                    message_context={}, extra_tags=''):
        """
        Wrapper of `django.contrib.messages.add_message`, that reads
        the message text from a template.
        """
        if 'django.contrib.messages' in settings.INSTALLED_APPS:
            try:
                message = render_to_string(message_template,
                                           message_context).strip()
                if message:
                    messages.add_message(request, level, message,
                                         extra_tags=extra_tags)
            except TemplateDoesNotExist:
                pass

class ClientResponses:
    unknowResult =  {'Error' : 'unknown result'}
    sucessResult =  {'Result' : 'sucess'}
    errorResult =  {'Result' : 'error'}