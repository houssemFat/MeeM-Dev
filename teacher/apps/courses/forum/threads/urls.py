from django.conf.urls import patterns, url
from . import views

urlpatterns = patterns('',   
    url(r'^(?P<id>[0-9]+)/$', views.view, name="teacher_forum_course_forum_view"),   
    url(r'^(?P<id>[0-9]+)/flag/$', views.flag, name="teacher_forum_course_forum_flag"),   
    url(r'^(?P<id>[0-9]+)/vote/$', views.vote, name="teacher_forum_course_forum_vote"),
    url(r'^(?P<id>[0-9]+)/delete/$', views.delete, name="teacher_forum_course_forum_delete"),
)