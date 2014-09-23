from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # account :
    url(r'^teacher/account/', include('teacher.apps.accounts.urls')),
    # invitations:
    url(r'^teacher/collaboration/invitations/', include('teacher.apps.collaboration.invitations.urls')),
)