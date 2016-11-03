# -*- coding: utf-8 -*-

from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from teacher.apps.decorators import can_view

from student.apps.courses.models import Course
from student.apps.courses.apps import AppConfig

import json

from core.apps.tools.common import render_json , MeeMJSONEncoder
from teacher.common import get_file_media_url
from . import helper
from django.http.response import Http404


# get the list of course belongs to current user
@login_required
def default(request):
    data = None
    if request.method == 'GET' :
        data = helper.get_list(request)
    if request.method == 'POST' :
        data = helper.create(request)
    if data != None :
        data = json.dumps(data, encoding="utf-8", cls=MeeMJSONEncoder)
        return render_json(request, data)
    raise Http404
# read ,  update , delete
@login_required
@can_view('Course', 'author', AppConfig.label)
def rud(request, id):
    data = {'result' : 'forbidden'}
    if request.method == 'GET' :
        data = helper.get_item (request, id)
    if request.method == 'PUT' :
        data = helper.update (request, id)
    if request.method == 'DELETE' :
        return helper.delete (request, id)
    data = json.dumps(data, encoding="utf-8", cls=MeeMJSONEncoder)
    return render_json(request, data)

#  delete
@login_required
def delete(request, id):
    return helper.delete(request, id)
# view a course with id=id 
def stats(request, id):
    from statstics import helper
    return helper.init (request)
    


# upload file 
@require_POST
@login_required
def upload_image(request, id):
    document = helper.upload_file (request, id)
    data = {'url' : get_file_media_url (document)}
    data = json.dumps(data, encoding="utf-8", cls=MeeMJSONEncoder)
    return render_json(request, data)

# upload file 
@require_POST
@login_required
def upload_cover(request, id):
    courseinfo = helper.upload_cover (request, id)
    data = {'url' : get_file_media_url (courseinfo, 'cover')}
    data = json.dumps(data, encoding="utf-8", cls=MeeMJSONEncoder)
    return render_json(request, data)
"""
courses = Course.objects.all ()
for course in courses :
    try :
        info = course.informations
    except CourseInformations.DoesNotExist :
        CourseInformations.objects.create(course = course).save()
"""