
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.http import Http404

from . import helper
from core.apps.tools.common import dump_and_render_json

# get the list of events or create new
@login_required
@require_http_methods (["GET", "POST"])
def default(request):
    data = None
    if request.user.is_authenticated ():
        if request.method == 'GET' :
            data = helper.task_list(request)
        else:
            if request.method == 'POST' :
                data = helper.create(request)
        return dump_and_render_json(request, data)
    return dump_and_render_json(request, {'Error' : 'unknown result'})

# read ,  update , delete 
@login_required
@require_http_methods (["GET", "PUT", "DELETE"])
def rud(request, id):
    data = None
    try :
        if request.method == 'GET' :
            data = helper.get (request, id)
        if request.method == 'PUT' :
            data = helper.update (request, id)
        if request.method == 'DELETE' :
            data =  helper.delete (request, id)
        return dump_and_render_json(request, data)
    except Exception :
        raise Http404()