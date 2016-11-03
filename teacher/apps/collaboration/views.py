
from django.contrib.auth.decorators import login_required

from core.apps.tools.common import render_json, MeeMJSONEncoder
import json
from . import helper


# get the list of events or create new
@login_required
def default(request):
    data = None
    if request.method == 'GET' :
        data = helper.member_list(request)
    return send_response(request, data)

# read ,  update , delete 
@login_required
def rud(request, id):
    data = {'result' : 'forbidden'}
    if request.method == 'GET' :
        data = helper.get (request, id)
        """if request.method == 'DELETE' :
            data =  helper.delete (request, id)"""
    return send_response(request, data)

def send_response(request, data):
    return render_json(request, json.dumps(data, encoding="utf-8", cls = MeeMJSONEncoder))