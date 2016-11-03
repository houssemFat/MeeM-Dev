# -*- coding: utf-8 -*-
from student.apps.courses.forum.models import CourseForum as Topic,  CourseForumThread as Thread
from student.apps.courses.models import Course
from datetime import datetime
from django.http import Http404
from core.apps.tools.common import render_json, dump_and_render_json

import json
# get the list of incoming messages
def default(request):
    if request.user.is_authenticated ():
        from django.forms.models import model_to_dict
        try :
            course = Course.objects.get(id=request.GET['cid'])
            topics = Topic.objects.filter(course=course)#.values ('id', 'body', 'subject', 'at', 'seen')
            items = []
            for topic in topics :
                item = model_to_dict(topic, ['title', 'content', 'created_time', 'id'])
                item ['from'] = { 'name' : topic.author.username, 'id' : topic.author.id }
                item ['at'] = str(item['created_time'])
                items.append(item)
            response = {'count' : topics.count (), 'list' : items , 'course'  : model_to_dict(course, [ 'id'])}
            return render_json(request, json.dumps(response, encoding="utf-8"))
        except Course.DoesNotExist :
            return dump_and_render_json(request, None)
    else :
        raise Http404

# set the currrent message as seen
def view(request, id):
    if request.user.is_authenticated ():
        from django.forms.models import model_to_dict
        message = Topic.objects.get(id=id)
        if not message.seen :
            message.seen= True;
            if message.at == None :
                message.at = datetime.now()
            message.save ()
        result = model_to_dict(message, fields =['at', 'body', 'subject', 'id'])
        #datetime.date() is not JSON serializable
        result['at'] = str(result['at'])
        result['author'] = {'name'  : message.author.username, 'id'  : message.author.id}
        return render_json(request, json.dumps(result, encoding="utf-8"))
    else :
        raise Http404

def search(request, query):
    return dump_and_render_json(request, None)

def compose(request, id):
    #deleted related
    return dump_and_render_json(request, None)

def flag(request, id):
    return dump_and_render_json(request, None)

def vote(request, id):
    #deleted related
    return dump_and_render_json(request, None)

def delete(request, id):
    #deleted related
    return dump_and_render_json(request, None)

""" view a course with id=id 
def view(request, id):
    result = {}
    if request.method == 'POST':
        form = StudentCreationForm(request.POST)
        if form.is_valid():
            course = form.save(request)
            # return HttpResponseRedirect("/books/")
            # Redirect to a success page.
            result.update({'satus': 'OK'})
        else:
            # Show an error page
            result.update({'status': 'Error'})
            result.update({'message': error_form_serialization (form.errors)})
    else :
        user = request.user
        items = list()
        course = Course.objects.get(author=user, pk=id)
        from django.forms.models import model_to_dict
        result = model_to_dict(course, fields =['start', 'end', 'title', 'about', 'id'])
    return render_json(request, json.dumps(result, encoding="utf-8", cls=DjangoJSONEncoder))

# view a course with id=id 
def stats(request, id):
    courses = Course.objects.prefetch_related('students').filter(author=user).values ('title', 'abouts')
    course = Course.objects.prefetch_related('students').get(author=user, pk=id)
    result = model_to_dict(course)
    for subscriber in course.students.all() :
        items.append(model_to_dict(subscriber, fields = ['id', 'username']))
    return render_json(request, json.dumps(items, encoding="utf-8"))


# User.objects.annotate(page_count=Count('page')).filter(page_count__gte=2).count()
def delete(request, id):
    delete_template_name = 'tcourse/delete.html'
    user = request.user
    form = DeletCourseForm(user=user, data=request.POST or None)
    try : 
        course = Course.objects.get(author=user, pk=id)
    except Course.DoesNotExist :
        return render(request, 't404.html')
    if request.method == 'POST':
        if form.is_valid():
            if course.author == request.user :
                course.delete ()
                from django.contrib import messages
                messages.success(request, 'Suppression réussite.')
                return redirect('/teacher');
            else :
                return render(request, 't404.html')
    return render(request, delete_template_name, {'id' : id, 'form' : form, 'title' : course.title })
    url(r'^$', views., name="account_view_list"),          
    url(r'^(?P<id>[0-9]+)/$', views.view, name="account_view_item"),  
    url(r'^search/$', views.search, name="account_view_list"),   #search inside list
    url(r'^(?P<id>\w+)/trash/$', views.trash, name="teacher_course_view_delete"),
    url(r'^(?P<id>\w+)/delete/$', views.delete, name="teacher_course_view_delete"),"""