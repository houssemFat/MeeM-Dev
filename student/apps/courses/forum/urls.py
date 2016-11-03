from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns('',
    url(r'^$', views.default, name="teacher_forum_course_forum"),
    url(r'^/compose/$', views.compose, name="teacher_forum_course_compose"), 
    url(r'^/search/(?P<query>w+)$', views.search, name="teacher_forum_course_search"),     
    url(r'^(?P<id>[0-9]+)/$', views.view, name="teacher_forum_course_forum_view"),   
    url(r'^(?P<id>[0-9]+)/flag/$', views.flag, name="teacher_forum_course_forum_flag"),   
    url(r'^(?P<id>[0-9]+)/vote/$', views.vote, name="teacher_forum_course_forum_vote"),
    url(r'^(?P<id>[0-9]+)/delete/$', views.delete, name="teacher_forum_course_forum_delete"),
)