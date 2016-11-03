from django.conf.urls import patterns, url
from . import views
urlpatterns = patterns('',
    # user is out    
    url(r'^$', views.default, name="account_inbox_view_list"),
    url(r'^sent/$', views.sent, name="account_inbox_view_list"),   #search inside list 
    url(r'^search/$', views.search, name="account_inbox_view_list"),   #search inside list         
    url(r'^(?P<id>[0-9]+)/$', views.view, name="account_inbox_item_view"),          
    url(r'^(?P<id>\w+)/trash/$', views.trash, name="account_inbox_item_trash"),
    url(r'^(?P<id>\w+)/delete/$', views.delete, name="account_inbox_item_delete"),
)