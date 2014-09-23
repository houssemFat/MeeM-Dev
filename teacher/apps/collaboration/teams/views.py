
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST

from core.apps.tools.common import dump_and_render_json
import json
from . import helper


# get the list of events or create new
@login_required
def default(request):
    data = None
    if request.method == 'GET' :
        data = helper.team_list(request)
    else:
        if request.method == 'POST' :
            data = helper.create_team(request)
    return dump_and_render_json(request, data)

# read ,  update , delete 
def rud(request, id):
    data = {'result' : 'forbidden'}
    if request.user.is_authenticated ():
        if request.method == 'GET' :
            data = helper.get (request, id)
        if request.method == 'PUT' :
            data = helper.update (request, id)
        if request.method == 'DELETE' :
            data =  helper.delete (request, id)
    return dump_and_render_json(request, data)


@require_POST 
def join(request, id):
    data = helper.join_team(request, id)
    return dump_and_render_json(request, data)


@require_POST 
def quit(request, id):
    data = helper.quit_team(request, id)
    return dump_and_render_json(request, data)


def send_response(request, data):
    return dump_and_render_json(request, data)