from django.db import models
from django.db.models.signals import post_save
from django.db.models import Q
from django.db.models.manager import Manager

from teacher.apps.collaboration.models import Collaborator
from core.apps.accounts.models import User

class TeacherManager(Manager):
    """
    returun collaborator of current teacher
    """
    
    
# if you use this decorator , you must add function __str__

class Teacher(models.Model):
    id = models.IntegerField(primary_key=True)
    cin = models.IntegerField()
    user = models.OneToOneField(User, db_column="user_id")
    
    objects = TeacherManager()
    
    def get_collaborators (self, select_related):
        objects = Collaborator.objects.filter(Q(source=self.user) | Q(user=self.user))
        if select_related:
            objects.select_related('user')
        return objects.distinct()
    
    class Meta:
        db_table = 'teacher'

class TeacherProfile (models.Model):
    teacher = models.OneToOneField(Teacher, primary_key=True, db_column="user_id")
    
    def __str__(self):
        return self.url
    class Meta:
        db_table = 'teacher_profile'


class TeacherNotificationSettings(models.Model):
    teacher = models.OneToOneField(Teacher, primary_key=True, db_column="user_id")
    is_phone_public = models.BooleanField(default=False)
    is_adresse_public = models.BooleanField(default=False)
    is_msg_comment = models.BooleanField(default=False)
    is_msg_book = models.BooleanField(default=False)
    is_msg_author_event = models.BooleanField(default=False)
    is_msg_follower_event = models.BooleanField(default=False)
    is_msg_user_follow = models.BooleanField(default=False)
    class Meta:
        db_table = 'teacher_notifications_settings'
        
def my_callback(sender, instance, created, raw, using, **kwargs):
    if created:
        TeacherNotificationSettings.objects.create(teacher = instance).save()
        TeacherProfile.objects.create(teacher = instance).save()
        return True
    return False
             
post_save.connect(my_callback, sender=Teacher)