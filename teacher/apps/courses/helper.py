# -*- coding: utf-8 -*-
from django.http import Http404
from django.forms.models import model_to_dict
from django.core.urlresolvers import reverse
from django.http import  HttpResponseForbidden
from django.shortcuts import redirect
from django.db.models import Count

from core.apps.accounts.models import User as Teacher
from core.apps.history.models import UserLogEntry
from core.apps.decorators import require_PUT

from teacher.common import  render
from student.apps.courses.models import Course
from django.views.decorators.http import require_POST, require_GET

from forms import DeletCourseForm, CourseForm

from teacher.common import get_file_media_url
from authorization import can_delete
from django.contrib.contenttypes.models import ContentType


course_fields = ['start_at', 'end_at', 'title', 'about', 'id', 'last_updated', 'created_at']
course_informations = ['facebook_link', 'twitter_link', 'google_plus_link']
@require_GET
def get_list(request):
    user = request.user
    items = list()
    courses = Course.objects.annotate(std_count=Count('students')).filter(author=user).values ('start_at', 'end_at', 'title', 'about', 'id', 'std_count')
    for course in courses :
        items.append(course)
    return items 

@require_POST
def create (request):
    form = CourseForm(data=request.POST or None)
    try :
        user = Teacher.objects.get(pk=request.user.id)
        if form.is_valid () :
            course = form.create(user)
            return model_to_dict(course, fields =course_fields)
    except Exception as e:
        return e
    raise Http404

@require_PUT
def update (request, id):
    try :        
        form = CourseForm(request.PUT or None)
        course = Course.objects.get(author=request.user.id, pk=id)
        if form.is_valid () :
            course = form.update(course)
            content_type = ContentType.objects.get_for_model(course)
            UserLogEntry.objects.log_action(request.user.id, content_type.pk, course.id, unicode(course.title), 3)
            return model_to_dict(course, fields =course_fields)
        else :
            return form.error_messages
    except Exception as e:
        return e
    raise Http404

def upload_file (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        from .forms import DocumentForm
        file = request.FILES['file']
        title = file.name
        form = DocumentForm({ 'title' : title }, request.FILES)
        if form.is_valid():
            newfile = form.create(request, user, file)
            return newfile
        return form._errors
    except Teacher.DoesNotExist as e:
        raise e
    raise Http404


def upload_cover (request, id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        try :
            course = Course.objects.get(pk=id)
            from .forms import CoverForm
            image = request.FILES['cover_file']
            form = CoverForm({}, request.FILES)
            if form.is_valid():
                url = form.update_course_cover(request,  course, image)
                return url
            return form._errors
        except Course.DoesNotExist as e:
            raise e
    except Teacher.DoesNotExist as e:
        raise e
    raise Http404
def get_item(request, id):
    try :
        course = Course.objects.get(author=request.user.id, pk=id) 
        data = model_to_dict(course, fields =course_fields)
        data.update(model_to_dict(course.informations, fields = course_informations))
        data['about'] = data['about'].replace ('/media',  'http://127.0.0.1:8000/media')
        data['cover'] =''
        if  course.informations.cover is not None :
            data['cover'] = get_file_media_url (course.informations, 'cover')
        return data
    except Course.DoesNotExist :
        raise  Http404


# delete

def delete(request, id):
    delete_template_name = 'tcourse/delete.html'
    user = request.user
    form = DeletCourseForm(user=user, data=request.POST or None)
    try : 
        course = Course.objects.get(author=user, pk=id)
        url = ''
        url = reverse ('teacher_course_view_delete', urlconf = 'teacher.apps.courses.urls', args=[id])
        if request.method == 'POST':
            if form.is_valid():
                if can_delete (user, course) :
                    course.delete ()
                    # delete recursive dependencies
                    from django.contrib import messages
                    messages.success(request, 'Suppression réussite.')
                    return redirect('/teacher');
                else :
                    raise HttpResponseForbidden
    except Course.DoesNotExist :
        return render(request, 't404.html')
    return render(request, delete_template_name, {'id' : id, 'form' : form, 'title' : course.title , url : url })

