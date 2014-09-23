from django.forms.models import model_to_dict
from django.http import Http404
from django.contrib.contenttypes.models import ContentType

from core.apps.notifications.models import Notification
#from datetime import timedelta


def get_notifications (request):
    user = request.user
    items = []
    notifications = user.notifications.filter(seen=False).all()
    for notification in notifications :
        ObjectKlass = ContentType.objects.get_or_create(notification.content_type)
        object =  ObjectKlass.objects.get (pk=notification.object_id)
        item = {'text' : object.__NotificationMessage__, 'date' : notification.created_at}
        items.append(item)
    return {'count' : items.count (), 'list' : items }
def get_notifications_count (request):
    items = []
    user = request.user
    notifications_count = user.notifications.filter(seen=False).count ()
    return {'count' : notifications_count, 'list' : items }

       