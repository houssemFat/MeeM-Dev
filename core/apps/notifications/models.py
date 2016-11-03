from django.db import models
from core.apps.accounts.models import User
from django.utils.translation import ugettext_lazy as _
from django.contrib.contenttypes.generic import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from datetime import datetime


class Notification(models.Model):
    user = models.OneToOneField(User, db_column="user_id", related_name='notifications')
    created_at = models.DateField(_("Date"), default=datetime.now)
    seen = models.BooleanField(db_column="seen", default=False)
    
    content_type = models.ForeignKey(ContentType)
    object_id = models.IntegerField()
    content_object = GenericForeignKey()
    
    class Meta:
        db_table = 'accounts_notification'
