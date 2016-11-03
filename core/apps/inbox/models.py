from core.apps.accounts.models import User as User

from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.db.models.signals import post_save

from datetime import datetime


class Message(models.Model):
    author = models.ForeignKey(User, db_column="author_id", related_name='sent_messages')
    subject = models.CharField(max_length=35, db_column="subject")
    message = models.CharField(max_length=500, db_column="body")
    destinator = models.ForeignKey(User, db_column="user_id", related_name='received_messages')
    sent_at = models.DateField(_("Date", db_column="sent_at"), default=datetime.now)
    seen = models.BooleanField(db_column="seen", default=False)
    # intrash
    # starred
    # state ( important, need reply , professionnel, favorite , trash)
    
    class Meta:
        db_table = 'accounts_inbox'
    
    def get_notification_text(self) :
        return self.message
    

def my_callback(sender, instance, created, raw, using, **kwargs):
    if created:
        import helper 
        helper.notifiy_user(instance)  

post_save.connect(my_callback, sender=Message)