# -*- coding: utf-8 -*-
from datetime import datetime
from django.http import Http404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.forms.models import model_to_dict


from core.apps.tools.common import render_json, dump_and_render_json
from student.apps.courses.forum.models import CourseForum  as Forum ,  CourseForumThread as Thread
from student.apps.courses.models import Course

import helper

import json
# get the list of incoming messages
@login_required
@require_http_methods(['POST', 'GET'])
def default(request):
    if request.method == 'GET' :
        data = helper.get_list (request)
    else :
        data = helper.compose (request)
    return dump_and_render_json(request,data)
    

@login_required
def view(request, id):
    data = helper.get_item(request, id)
    return dump_and_render_json(request,data)

@login_required
def search(request, id):
    data = helper.get_item(request, id)
    return dump_and_render_json(request,data)


def flag(request, id):
    return dump_and_render_json(request, None)

def vote(request, id):
    return dump_and_render_json(request, None)

def delete(request, query):
    return dump_and_render_json(request, None)