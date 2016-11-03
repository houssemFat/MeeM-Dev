from datetime import datetime

from django.db import models
from django.contrib.contenttypes.generic import GenericForeignKey
from django.contrib.contenttypes.models import ContentType



from core.apps.accounts.models import User as User


class Activity(models.Model):

    author = models.ForeignKey(User, null=True, related_name="activities")
    
    content_type = models.ForeignKey(ContentType)
    object_id = models.IntegerField()
    content_object = GenericForeignKey()
    activity = models.TextField()
    date = models.DateTimeField(default=datetime.now)

    def __unicode__(self):
        return "pk=%d" % self.pk
