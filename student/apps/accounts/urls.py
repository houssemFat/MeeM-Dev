from django.conf.urls import patterns, include, url
from . import views

# Uncomment the next two lines to enable the admin:

urlpatterns = patterns('',
       # user is out
       url(r'^j/login/$', views.login, name="account_login"),
       url(r'^j/register/$', views.register, name='account_signup'),
       url(r"^password/reset/$", views.password_reset, name="account_student_reset_password"),
       url(r'^confirm_email/(?P<key>\w+)/$', views.confirm_email, name="account_student_confirm_email"),
       url(r'^confirm_sms_account/(?P<key>\w+)/$', views.confirm_sms_account, name="account_student_confirm_sms"),
       url('^(?P<provider>.*)/signup/$', views.social_login, name='socialaccount_signup'),
                                       
)