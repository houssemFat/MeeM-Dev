from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns('',
    url(r'^$', views.default, name="teacher_collaboration_memeber_default"),
    url(r'^(?P<id>[0-9]+)/$', views.rud, name="teacher_course_memeber_rud"),   
    url(r'^invitations/', include('teacher.apps.collaboration.invitations.urls')),
    url(r'^tasks/', include('teacher.apps.collaboration.tasks.urls')),
    url(r'^teams/', include('teacher.apps.collaboration.teams.urls')),
    url(r'^invitations/', include('teacher.apps.collaboration.invitations.urls')),
)