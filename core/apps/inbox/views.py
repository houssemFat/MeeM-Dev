# -*- coding: utf-8 -*-
from django.http import Http404

from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET

import json

from core.apps.tools.common import dump_and_render_json, render_json,  MeeMJSONEncoder
import helper
# get the list of incoming messages
@login_required
def default(request):
    data = None 
    if request.method == 'GET' :
        data = helper.get_recieved_messages(request)
    if request.method == 'POST' :
        data = helper.compose_message(request)
    if data != None :
        return send_reponse(request, data)
    raise Http404
# get the list of outcoming messages

@login_required
@require_GET
def sent(request):
    if request.method == 'GET' :
        data = helper.get_sent_messages(request)
        return send_reponse(request, data)
    raise Http404

@login_required
def view(request, id):
    try : 
        data = helper.get_message(request, id)
        return send_reponse (request, data)
    except Exception :
        raise Http404
def search(request):
    return send_reponse(request, None)

def trash(request):
    return dump_and_render_json(request, None)

def delete(request, id):
    return dump_and_render_json(request, None)

def send_reponse(request, data):
    return render_json(request, json.dumps(data, encoding="utf-8", cls=MeeMJSONEncoder))