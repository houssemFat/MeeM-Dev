from django.forms.models import model_to_dict
from django.http import Http404
from django.contrib.contenttypes.models import ContentType

from datetime import datetime
from core.apps.inbox.models import Message
from core.apps.notifications.models import Notification
#from datetime import timedelta

message_fields = ['sent_at', 'message', 'subject', 'id']

def get_recieved_messages (request):
    user = request.user
    items = []
    messages = user.received_messages.select_related('author').all()
    for message in messages :
        item = model_to_dict(message, message_fields)
        item ['related'] = { 'name' : message.author.username, 'id' : message.author.id }
        items.append(item)
    return {'total' : messages.count (), 'list' : items }

def get_sent_messages (request):
    user = request.user
    items = []
    messages = user.sent_messages.select_related('distinator').all()
    for message in messages :
        item = model_to_dict(message, message_fields)
        item ['distinator'] = { 'name' : message.author.username, 'id' : message.author.id }
        items.append(item)
    return {'total' : messages.count (), 'list' : items }

def compose_message (request):
    user = request.user
    items = []
    messages = user.sent_messages.select_related('distinator').all()
    for message in messages :
        item = model_to_dict(message, message_fields)
        item ['distinator'] = { 'name' : message.author.username, 'id' : message.author.id }
        items.append(item)
    return {'total' : messages.count (), 'list' : items }

def get_message (request, id):
    try :
        message = Message.objects.get(id=id)
        if not message.seen :
            message.seen= True;
            if message.sent_at == None :
                message.sent_at = datetime.now()
            message.save ()
        result = model_to_dict(message, fields =message_fields)
        result['author'] = {'name'  : message.author.username, 'id'  : message.author.id}
        return result
    except Message.DoesNotExist :
        pass
    raise Http404

def notifiy_user(message):
    notification = Notification ()
    notification.user = message.author
    notification.content_type = ContentType.objects.get_for_model(message)
    notification.object_id = message.id