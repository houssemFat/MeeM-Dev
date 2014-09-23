from django.conf.urls import patterns, url
from . import views
# Uncomment the next two lines to enable the admin:

urlpatterns = patterns('',
    # user is out
    url(r'^', views.default, name="teacher_dashboard_default"),             
)