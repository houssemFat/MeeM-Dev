from django.conf.urls import patterns,  url, include 
from . import views

urlpatterns = patterns('',
    # user is out    
    url(r'^$', views.default, name="teacher_course_view_list"),       
    url(r'^(?P<id>[0-9]+)/$', views.rud, name="teacher_course_view_view"),   
    url(r'^(?P<id>\w+)/stats/$', views.stats, name="teacher_course_view_stats"),
    url(r'^(?P<id>\w+)/delete/$', views.delete, name="teacher_course_view_delete"),
    url(r'^(?P<id>\w+)/image/upload/$', views.upload_image, name="teacher_course_view_upload_image"),
    url(r'^(?P<id>\w+)/cover/upload/$', views.upload_cover, name="teacher_course_view_upload_cover"),
    
   # quizzes
    url(r'^quiz/', include('teacher.apps.courses.quizzes.urls')),
    # quizzes
    url(r'^task/', include('teacher.apps.courses.tasks.urls')),
    # quizzes
    url(r'^forum/', include('teacher.apps.courses.forum.urls')),
    # quizzes
    url(r'^syllabus/', include('teacher.apps.courses.syllabuses.urls')),
)