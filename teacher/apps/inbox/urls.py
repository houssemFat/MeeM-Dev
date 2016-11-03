from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns('',
    # Redirect all default routes to app 
    url(r'^', include('core.apps.inbox.urls')),
    url(r'^qsearch/$', views.quick_search, name='teacher_inbox_user_quick_search'),
)