from django.contrib.contenttypes.models import ContentType
from django.utils.encoding import smart_text
from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _
from datetime import datetime
from core.apps.accounts.models import User 

class UserLogEntryManager(models.Manager):
    def log_action(self, user_id, content_type_id, object_id, object_repr, action_flag, change_message=''):
        e = self.model(None, None, user_id, content_type_id, smart_text(object_id), object_repr[:200], action_flag, change_message)
        e.save()

class UserLogEntry(models.Model):
    user = models.ForeignKey(User, related_name="history")
    # using , auto_now=True, make is attribute editable false, and then you can't retrive data using model_to_dic
    action_time = models.DateTimeField(_('action time'))
    content_type = models.ForeignKey(ContentType, blank=True, null=True)
    object_id = models.TextField(_('object id'), blank=True, null=True)
    object_repr = models.CharField(_('object repr'), max_length=200)
    action_flag = models.PositiveSmallIntegerField(_('action flag'))
    change_message = models.TextField(_('change message'), blank=True)
    
    objects = UserLogEntryManager()
    
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = datetime.now ()

        return super(UserLogEntry, self).save(*args, **kwargs)
    
    class Meta:
        verbose_name = _('log entry')
        verbose_name_plural = _('log entries')
        db_table = 'accounts_user_activity_history'
        ordering = ('-action_time',)
        
    def __unicode__(self):
        return self.change_message
    