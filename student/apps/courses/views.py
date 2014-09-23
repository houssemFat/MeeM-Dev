# -*- coding: utf-8 -*-
from django.shortcuts import render
from .models import Course
from teacher.apps.decorators import can_view
from core.apps.tools.common import dump_and_render_json 

from core.apps.accounts.models import User
from django.core.paginator import Paginator


def list(request):
    if (not request.user.is_authenticated ()) or 'type' in request.GET:
        list = []
        items =  Course.objects.all()
        paginator = Paginator(items, 10)
        recents_activities = paginator.page(1)
        for item in items:
            list.append ({'id' : item.id, 
                          'title' : item.title.encode("utf-8"), 
                          'ccount' : item.chapters.count(),
                          'scount': item.students.count()})
        return dump_and_render_json (request, list)
    else :
        list = []
        items =  User.objects.get(pk=request.user.id).myclass.all()
        for item in items:
            list.append ({'id' : item.id, 
                          'title' : item.title.encode("utf-8"), 
                          'ccount' : item.chapters.count(),
                          'scount': item.students.count()})
        return dump_and_render_json (request, list)
    #else :
    #return render(request, 'public/register.html', {'register_form': ProfessorCreationForm()})

#@can_view(Course, 'author', 'student_apps_courses')
def view(request, id):
    #if request.user.is_authenticated ():
    item =  Course.objects.get(pk=id)
    student_list = []
    for student in item.students.all():
        student_list.append ({'id' : student.id, 'username' :  student.username.encode("utf-8")})
    chapter_list = []
    for chapter in item.chapters.all():
        chapter_list.append ({'id' : chapter.id, 'title' :  chapter.title.encode("utf-8")})
    
    result = {'id' : item.id, 'title' :  item.title.encode("utf-8"), 
              'scount' : item.students.count(), 
              'students' : student_list,
              'ccount' : len(chapter_list),  
              'chapters' : chapter_list}
    return dump_and_render_json (request, result)

def subscribe(request, id):
    #if request.user.is_authenticated ():
    item =  Course.objects.get(pk=id)
    student_list = []
    for student in item.students.all():
        student_list.append ({'id' : student.id, 'username' :  student.username.encode("utf-8")})
    chapter_list = []
    for chapter in item.chapter_set.all():
        chapter_list.append ({'id' : chapter.id, 'title' :  chapter.title.encode("utf-8")})
    
    result = {'id' : item.id, 'title' :  item.title.encode("utf-8"), 
              'scount' : item.students.count(), 
              'students' : student_list,
              'ccount' : len(chapter_list),  
              'chapters' : chapter_list}
    return dump_and_render_json (request, result)

