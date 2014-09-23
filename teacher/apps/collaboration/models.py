from django.db import models
from core.apps.accounts.models import User
from datetime import datetime


class Collaborator(models.Model):
    source = models.ForeignKey(User, db_column="source_id", related_name="my_collaborators")
    user = models.ForeignKey(User, db_column="user_id", related_name="my_collaborators_with_others")
    join_at = models.DateTimeField(default=datetime.now)
    class Meta:
        db_table = 'teacher_collaboration_collaborator'
        unique_together = ['source', 'user']

class CollaboratorInvitation(models.Model):
    fromuser = models.ForeignKey(User, db_column="source_id", related_name="sent_invitations")
    usermail = models.EmailField()
    sent_at = models.DateTimeField(default=datetime.now)
    accepted = models.BooleanField(default=False)
    class Meta:
        db_table = 'teacher_collaboration_collaborator_invitation'