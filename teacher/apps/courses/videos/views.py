from django.http import Http404, HttpResponseServerError
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods


from core.apps.tools.common import dump_and_render_json
from core.apps.decorators import require_request_attributes

from student.apps.courses.videos.models import Video
from student.apps.courses.videos.apps import AppConfig as VideoAppConfig


from teacher.apps.decorators import can_edit, can_view

from . import helper

# get the list of chapter or create a new 
@login_required
@require_http_methods (['GET', 'POST'])
@require_request_attributes(['cid'])
def default(request):
    data = None
    if request.method == 'GET' :
        data = helper.get_list (request, request.GET['cid'])
    else :
        # create 
        data = helper.create(request)
    if data != None :
        return dump_and_render_json(request, data)
    raise Http404()

# read ,  update , delete
@login_required
@require_http_methods (['GET', 'PUT', 'DELETE'])
@can_edit('Video', 'author', VideoAppConfig.label)
def rud(request, id):
    data = None
    if request.method == 'GET' :
        data = helper.get (request, id)
    if request.method == 'PUT' :
        data = helper.update (request, id)
    if request.method == 'DELETE' :
        data = helper.delete (request, id)
    return dump_and_render_json(request, data)
    raise Http404()

# upload file 
@require_http_methods (['POST'])
@can_edit('Video', 'author', VideoAppConfig.label)
def upload_script(request, id):
    data = helper.upload_script (request, id)
    return dump_and_render_json(request, data)
    raise HttpResponseServerError


# upload file 
@can_edit('Video', 'author', VideoAppConfig.label)
@require_http_methods (['POST'])
def upload_file(request, id):
    from teacher.apps.courses.documents import helper as documents_helper
    video = Video.objects.get(id=request.POST['id'])
    document = documents_helper.upload_file (request, video.chapter.id)
    data = helper.attach_new_file(document, video)
    return dump_and_render_json(request, data)
    raise HttpResponseServerError
