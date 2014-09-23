from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns('',
    # user is out    
    url(r'^invite/$', views.invite, name="teacher_collaborator_invitation_invite"), 
    url(r'^sent/$', views.get_sent, name="teacher_invitation_sent"),
    # sent by me   
    url(r'^(?P<id>[0-9]+)/decline/$', views.decline, name="teacher_invitation_response"),  
    # refuse a collaboration invitation  
    url(r'^coming/(?P<id>[0-9]+)/decline/$', views.decline, name="teacher_invitation_response"),     
    url(r'^coming/(?P<id>[0-9]+)/accept/$', views.decline, name="teacher_invitation_response"),
    
    url(r'^recieved/$', views.get_recieved, name="teacher_invitation_sent"),   
    url(r'^reply/(?P<id>[0-9]+)/$', views.replyto, name="teacher_invitation_response"), 
    
)