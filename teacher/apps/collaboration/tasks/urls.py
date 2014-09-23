from django.conf.urls import patterns,  url
from . import views
# Uncomment the next two lines to enable the admin:

urlpatterns = patterns('',
    # user is out    
    url(r'^$', views.default, name="teacher_collaboration_team_default"),
    url(r'^(?P<id>[0-9]+)/$', views.rud, name="teacher_course_view_rud"),   
)