from django.conf.urls import patterns, include, url

from student.apps.accounts import views

urlpatterns = patterns('',
    # account :
    url(r'^account/', include('student.apps.accounts.urls')),
    # comfirm email
    url(r'^confirm_email/(?P<key>\w+)/$', views.confirm_email, name="account_student_confirm_email"),
    
)