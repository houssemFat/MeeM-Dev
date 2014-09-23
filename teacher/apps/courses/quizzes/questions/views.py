
from django.http import Http404
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required


from core.apps.decorators import require_request_attributes
from core.apps.tools.common import  dump_and_render_json
from core.apps.accounts.models import User as Teacher

from student.apps.courses.chapters.models import Chapter

from . import helper

@login_required
@require_http_methods(['GET', 'POST'])
@require_request_attributes(['quizz_id'])
def default(request):
    data = None
    if request.method == 'GET' :
        data = helper.get_list(request, request.GET['quiz_id'])
    else :
        data = helper.create(request)                
    return dump_and_render_json (request, data)
    raise Http404()

# read ,  update , delete
@login_required
def rud(request, id):
    if request.method == 'GET' :
        data = helper.get (request, id)
    if request.method == 'PUT' :
        data = helper.update (request, id)
    if request.method == 'DELETE' :
        data = helper.delete (request, id)
    return dump_and_render_json (request, data)
