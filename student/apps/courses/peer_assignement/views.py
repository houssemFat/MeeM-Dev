from django.views.generic import FormView
from teacher.common import render
from core.apps.tools.common import render_json, dump_and_render_json
from student.apps.courses.models import Course, CourseSubscriber

from core.apps.accounts.models import User as Student
from django.core import serializers
from django.utils import simplejson
import json

# get the list of course belongs to current user
def default(request):
    return False
# get the list of course belongs to current user
def search(request):
    return False
