from django.conf import settings
from django.core.urlresolvers import reverse

# get the list of course belongs to current user
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from django.core.mail import EmailMessage

from datetime import timedelta, datetime

from teacher.apps.collaboration.models import CollaboratorInvitation
from core.apps.accounts.models import User

from core.apps.tools.common import  dump_and_render_json, render_json, MeeMJSONEncoder

import djrill
import json

invitation_fields = ['usermail', 'id', 'sent_at', 'accepted']
@require_POST
@login_required
def invite(request):
    #template = "tclassroom/invite_join_course"
    message = request.POST['message']
    userid = request.user.id
    username = request.user.username
    parsed_mails = request.POST['list'].split('#')
    emails = []
    me = User.objects.get(id=userid)
    email = me.email
    already = CollaboratorInvitation.objects.filter(fromuser=me, accepted=False)
    if (already.count () > 10):
        return dump_and_render_json(request, dict({'status' : 'error', 'code' : 'limited exceeded'}))
    tolist = []
    for item in parsed_mails :
        append = True
        if (item == email):
            continue
        for sent in already :
            if (sent.usermail == item) :
                append = False
                break
        if append :
            tolist.append(item)
            emails.append(CollaboratorInvitation (usermail=item, fromuser=me))
    
    if len(emails) == 0 :
        return dump_and_render_json(request, dict({'status' : 'error', 'code' : 'limited exceeded'}))
    #subject = render_to_string('teacher_invitation_subject.txt'.format(template))
    mandrillappmessage = EmailMessage(subject=username + " Invitation!", to=tolist, from_email=settings.EMAIL_NO_REPLY)
    mandrillappmessage.template_name = "TEACHER_COLLABORATION_INVITATION"
    mandrillappmessage.global_merge_vars = {                       # Merge tags in your template
                             'ACTIVATE': " show invitation", 'MESSAGE': message
    }
    merge_vars = {}
    CollaboratorInvitation.objects.bulk_create(emails)
    time_threshold = datetime.now() - timedelta(seconds=3)
    invitations = CollaboratorInvitation.objects.filter(sent_at__gt=time_threshold, fromuser=me)
    value = {}
    for invitation in invitations :
        value = model_to_dict(invitation, fields = ['usermail'])
        url = request.build_absolute_uri (reverse("teacher_invitation_response", args=[invitation.id]))
        value.update ({ 'URL' : url})
        merge_vars[invitation.usermail] = value
    
    mandrillappmessage.merge_vars = merge_vars
    """
    message.merge_vars = {
    'wiley@example.com': {'offer': "15% off anvils"},
    'rr@example.com':    {'offer': "instant tunnel paint"}
    }
    msg = EmailMultiAlternatives(subject, "body", settings.EMAIL_NO_REPLY, bcc=emails)                                      
    msg.attach_alternative(body, "text/html")                                                                                                                                                                               
    response_ = msg.send()
    """
    try :
        mandrillappmessage.send()
        return render_json(request, mandrillappmessage.mandrill_response)
    except djrill.MandrillAPIError as ex:
        return render_json(request, mandrillappmessage.mandrill_response)

@login_required
def get_sent (request):
    me = User.objects.get(id=request.user.id)
    sent = CollaboratorInvitation.objects.select_related('').filter(fromuser=me)
    useremails = []
    invitations = {}
    for invitation in sent :
        useremails.append(invitation.usermail)
        invitations[invitation.usermail] = model_to_dict(invitation, fields=invitation_fields)
    users = User.objects.filter(email__in=useremails)
    for user in users :
        invitations[user.email].update ({'user' : { 'id' : user.id , 'username' : user.username }})
    return send_response (request, {'list' : invitations.values()})

@login_required
def get_recieved (request):
    me = User.objects.get(id=request.user.id)
    tome = CollaboratorInvitation.objects.prefetch_related('fromuser').filter(usermail=me.email)
    invitations = []
    for invitation in tome :
        item =  model_to_dict(invitation, fields=invitation_fields)
        item['source'] =  model_to_dict(invitation.user, fields=['id', 'username'])
        invitations.append(item)
    return render_json(request, json.dumps(invitations, encoding="utf-8", cls=MeeMJSONEncoder))


def replyto(request, id):
    return dump_and_render_json(request, None)

@require_POST
@login_required
def decline(request, id):
    response =  { 'status' : 500 , 'id' : id, 'deleted' : False}
    me = User.objects.get(id=request.user.id)
    try :
        sent = CollaboratorInvitation.objects.select_related('').filter(fromuser=me)
        sent.delete()
        response['status'] = 200
        response ['deleted'] = True
    except CollaboratorInvitation.DoesNotExist :
        pass
    return send_response(request, response)


def send_response(request, data):
    return render_json(request, json.dumps(data, encoding="utf-8", cls = MeeMJSONEncoder))   