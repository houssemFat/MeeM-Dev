from django.conf.urls import patterns, include, url

from django.contrib import admin
from importlib import import_module
from django.conf import settings
from django.conf.urls.static import static
admin.autodiscover()

urlpatterns = patterns('',
    # home :
    url(r'^', include('student.urls')),
    
    # company
    url(r'^company/', include('core.apps.company.urls')),
    
    # student
    url(r'^student/', include('student.urls')),
    
    # teacher
    url(r'^teacher/', include('teacher.urls', namespace='teacher')),

    # admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # admin:
    url(r'^admin/', include(admin.site.urls)),
    
    # comment:
    url(r'^comment/', include('core.apps.comments.urls')),
    
    # Language url
    (r'^i18n/', include('django.conf.urls.i18n')),
    
    # common js path
    url(r'^cjs/(?P<path>.*)$', 'core.apps.tools.static.serve', {'document_root': settings.COMMON_JS_ROOT, 'show_indexes': True}),
    
    # common css path
    url(r'^ccss/(?P<path>.*)$', 'core.apps.tools.static.serve', {'document_root': settings.COMMON_CSS_ROOT, 'show_indexes': True}),
)
if settings.DEBUG:
    # media files
    urlpatterns += patterns('',
                            (r'^media/(?P<path>.*)$', 'django.views.static.serve',
                             {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}
                             )
                            )
# include the url in which you would  reverse from any view in ROOT_URLCONF_REVERSED
if hasattr(settings, 'ROOT_URLCONF_REVERSED'):
    for reversed_urls in settings.ROOT_URLCONF_REVERSED :
        try :
            loaded_mod = import_module (reversed_urls)
            urlpatterns += loaded_mod.urlpatterns
        except ImportError:
            pass
