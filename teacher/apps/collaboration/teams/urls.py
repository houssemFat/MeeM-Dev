from django.conf.urls import patterns, include, url
import views
# Uncomment the next two lines to enable the admin:

urlpatterns = patterns('',
    # user is out    
    url(r'^$', views.default, name="teacher_collaboration_team_default"),
    url(r'^(?P<id>[0-9]+)/$', views.rud, name="teacher_course_team_rud"), 
    url(r'^(?P<id>[0-9]+)/join/$', views.join, name="teacher_collaborator_join_team"),
    url(r'^(?P<id>[0-9]+)/quit/$', views.quit, name="teacher_collaborator_quit_team"),    
)