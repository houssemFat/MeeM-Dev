
from django.http import Http404
from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.decorators import login_required
import json

from core.apps.tools.common import render_json, json_dump_meemencoder
from django.forms.models import model_to_dict

from . import helper

@require_GET
@login_required
# upload file 
def list(request):
    data = helper.get_list(request)
    return render_json(request, json_dump_meemencoder(data))

@require_POST
@login_required
# upload file 
def upload(request):
    id= request.POST['chapter_id']
    document = helper.upload_file(request, id)
    data = model_to_dict(document, fields=helper.document_fields)
    return render_json(request, json_dump_meemencoder(data))
