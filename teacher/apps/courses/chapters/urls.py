from django.conf.urls import patterns, url, include 
from . import views

urlpatterns = patterns('',
    # POST / GET (list) 
    url(r'^$', views.default, name="teacher_classroom_view_list"),   
    # PUT / POST / GET (item)
    url(r'^(?P<id>[0-9]+)/$', views.rud, name="teacher_course_view_rud"), 
    
   # documents
    url(r'^document/', include('teacher.apps.courses.documents.urls')),
   # tasks
    url(r'^tasks/', include('teacher.apps.courses.tasks.urls')),# quizzes
)