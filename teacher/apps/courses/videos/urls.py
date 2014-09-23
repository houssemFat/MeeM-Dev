from django.conf.urls import patterns, url
from . import views

urlpatterns = patterns('',
    # POST / GET (list) 
    url(r'^$', views.default, name="teacher_video_views_default"),
    # PUT / POST / GET (item)
    url(r'^(?P<id>[0-9]+)/$', views.rud, name="teacher_video_sview_rud"),
    # upload
    url(r'^(?P<id>[0-9]+)/file/upload/', views.upload_file, name="teacher_video_upload_document"),
    # upload
    url(r'^(?P<id>[0-9]+)/script/upload/', views.upload_script, name="teacher_video_upload_script"),
)