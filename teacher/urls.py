from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # courses :
    url(r'^', include('teacher.apps.public.urls')),
    # dashboard:
    url(r'^js/accounts/', include('teacher.apps.accounts.urls')),
    url(r'^accounts/', include('teacher.apps.accounts.urls')),
    # dashboard:
    url(r'^js/dashboard/', include('teacher.apps.dashboard.urls')),
    url(r'^dashboard/', include('teacher.apps.dashboard.urls')),
    # courses:
    url(r'^js/course/', include('teacher.apps.courses.urls')),
    url(r'^course/', include('teacher.apps.courses.urls')),
    # chapter
    url(r'^js/chapter/', include('teacher.apps.courses.chapters.urls')),
    url(r'^chapter/', include('teacher.apps.courses.chapters.urls')),
    # video
    url(r'^js/video/', include('teacher.apps.courses.videos.urls')),
    url(r'^video/', include('teacher.apps.courses.videos.urls')),
    
    # classroom
    url(r'^js/classroom/', include('teacher.apps.courses.classroom.urls')),
    url(r'^classroom/', include('teacher.apps.courses.classroom.urls')),
    # collaboration
    url(r'^js/collaboration/', include('teacher.apps.collaboration.urls')),
    url(r'^collaboration/', include('teacher.apps.collaboration.urls')),
    # inbox
    url(r'^js/inbox/', include('teacher.apps.inbox.urls')),
    url(r'^inbox/', include('teacher.apps.inbox.urls')),
    # document
    url(r'^js/document/', include('teacher.apps.courses.documents.urls')),
    url(r'^document/', include('teacher.apps.courses.documents.urls')),
   # collaboration
    url(r'^js/forum/', include('teacher.apps.courses.forum.urls')),
    url(r'^forum/', include('teacher.apps.courses.forum.urls')),
   # collaboration
    url(r'^js/thread/', include('teacher.apps.courses.forum.urls')),
    url(r'^thread/', include('teacher.apps.courses.forum.urls'))
)
