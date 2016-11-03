from django.conf.urls import patterns, include, url
from . import views
# Uncomment the next two lines to enable the admin:

urlpatterns = patterns('',
    # user is out    
    url(r'^$', views.default, name="teacher_classroom_view_list"),    
    url(r'^search/$', views.search, name="teacher_classroom_view_search"), 
)