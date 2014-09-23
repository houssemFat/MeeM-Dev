from django.views.generic import FormView
from teacher.common import render
from core.apps.tools.common import render_json, dump_and_render_json
from student.apps.courses.models import Course, CourseSubscriber

from core.apps.accounts.models import User as Student
from django.core import serializers
from django.utils import simplejson
import json

# get the list of course belongs to current user
def default(request):
    if request.user.is_authenticated ():
        if not request.method == 'GET' :
            return dump_and_render_json(request, None)
        else :
            try :
                id = request.GET['cid']
            except :
                return dump_and_render_json(request, None)
            try :
                course = Course.objects.get (pk=id)
                students = course.students.all()
                from django.forms.models import model_to_dict
                data = dict ()
                data['data'] = dict ()
                data['data']['invitations'] = 2
                data['data']['requests'] = 3
                classroom = list()
                for student in students :
                    student_ = model_to_dict(student, fields=['username', 'id', 'email'])
                    student_['cover'] = student.profile.thumb
                    classroom.append(student_)
                    data['students'] = classroom  # json.dumps(classroom, encoding="utf-8")
                return dump_and_render_json(request, data)
            except Course.DoesNotExist:
                return dump_and_render_json(request, None)
        
    else :
        return dump_and_render_json(request, None)
# get the list of course belongs to current user
def search(request):
    result = {'result' : None}
    if request.user.is_authenticated ():
        if not request.method == 'GET' :
            return dump_and_render_json(request, result)
        else :
            try :
                q = request.GET['q']
                cid = request.GET['cid']
            except :
                return dump_and_render_json(request, result)
            try :
                # get already in classroom
                already = CourseSubscriber.objects.filter (course__pk=cid).values_list('student__id')
                # filter in student
                students = Student.objects.filter(username__startswith=q)\
                    .exclude(id__in=already).values('username', 'id' , 'profile__thumb')[0:5]
                list_ = list(students)
                # FIXME , we must alias profile__thumb as thumb before turn on python
                for item in list_:
                    item['thumb'] = item.pop('profile__thumb')
                return render_json(request, simplejson.dumps({'result' : list_}))
            except Student.DoesNotExist:
                return dump_and_render_json(request, result)
        
    else :
        return dump_and_render_json(request, result)

# get the list of course belongs to current user
def invite(request):
    from django.conf import settings
    from django.core.urlresolvers import reverse
    from django.template.loader import get_template
    from django.template import Context
    from django.core.mail import EmailMultiAlternatives #, send_mass_mail 
    from django.template.loader import render_to_string
    
    result = {'result' : None}
    if request.user.is_authenticated ():
        if not request.method == 'POST' :
            return dump_and_render_json(request, result)
        
        id = request.POST['cid']
        course = Course.objects.get (pk=id)
        template = "tclassroom/invite_join_course"
        subscribe_url = reverse("app_course_subscribe", args=[id])
        subject = render_to_string('{0}_subject.txt'.format(template))
        
        message = request.POST['text']
        username = request.user.username
        # remove superfluous line breaks
        subject = " ".join(subject.splitlines()).strip()
        
        html = get_template('{0}_body.html'.format(template))
        body = html.render(Context({ message : message , username : username, subscribe_url : subscribe_url})).strip()
        list = request.POST['list'].split('#')
        
        """
        # send mass_mail
        datatuple = ()
        for item in list :
            datatuple += (subject, body, settings.DEFAULT_FROM_EMAIL, [item])
        
        datatuple = (datatuple,)
        response_ = send_mass_mail(datatuple)
        result = {'result' : response_}
        """
        
        emails = []
        for item in list :
            emails.append(item)
        """
        msg = EmailMultiAlternatives(subject, "body", settings.DEFAULT_FROM_EMAIL, bcc=emails)                                      
        msg.attach_alternative(body, "text/html")                                                                                                                                                                               
        response_ = msg.send()
        """
        from django.core.mail import EmailMessage
        from django.utils.translation import ugettext_lazy as _

        msg = EmailMessage(subject=subject, from_email="message-noreplay@meem.tn",
                           to=emails)
        msg.template_name = "invitation"           # A Mandrill template name
        """
        msg.template_content = {                        # Content blocks to fill in
            'TRACKING_BLOCK': "<a href='.../*|TRACKINGNO|*'>track it</a>"
        }
        """
        hello = unicode(_("Hello"))
        subscribe = unicode(_("Activate"))
        msg.global_merge_vars = {                       # Merge tags in your template
            'MESSAGE': message, 
            'URL': request.build_absolute_uri(subscribe_url) ,
            'TEACHER' : username , 
            'Hello' : hello , 
            'ACTIVATE' : subscribe
        }
        """
        msg.merge_vars = {                              # Per-recipient merge tags
            'accounting@example.com': {'NAME': "Pat"},
            'customer@example.com':   {'NAME': "Kim"}
        }
        """
        result = msg.send()
        return dump_and_render_json(request, result)
        
    else :
        return dump_and_render_json(request, result)
