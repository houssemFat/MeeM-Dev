from django.conf.urls import patterns, include, url

from teacher.apps.accounts import views

urlpatterns = patterns('',
    # account :
    url(r'^teacher/account/', include('teacher.apps.accounts.urls')),
    # invitations:
    url(r'^teacher/collaboration/invitations/', include('teacher.apps.collaboration.invitations.urls')),
    # comfirm email
    url(r'^teacher/confirm_email/(?P<key>\w+)/$', views.confirm_email, name="account_teacher_confirm_email"),
    
)