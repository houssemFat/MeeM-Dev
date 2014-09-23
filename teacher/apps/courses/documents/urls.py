from django.conf.urls import patterns, url
from . import views

urlpatterns = patterns('',
    # POST / GET (list) 
    url(r'^$', views.list, name="teacher_document_views_list"),   
    # upload
    url(r'^upload/', views.upload, name="teacher_document_views_upload"),
)