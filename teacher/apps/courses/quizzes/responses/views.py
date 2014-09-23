
from django.http import Http404


from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

from core.apps.decorators import require_request_attributes
from core.apps.tools.common import dump_and_render_json

from . import helper
quizzes_fields=['title', 'created_at', 'about', 'id']

@login_required
@require_http_methods(['GET', 'POST'])
@require_request_attributes(['questionId'])
def default(request):
    data = None
    if request.method == 'GET' :
        data = helper.get_list(request, id)
    else :
        data = helper.create(request)                
    return dump_and_render_json (request, data)
    raise Http404()

# read ,  update , delete
@login_required
@require_http_methods(['GET', 'PUT', 'DELETE'])
def rud(request, id):
    if request.method == 'GET' :
        data = helper.get_item(request, id) 
    elif request.method == 'PUT' :
        data = helper.update (request, id)
    elif request.method == 'DELETE' :
        data = helper.delete (request, id)
    return dump_and_render_json(request, data)
