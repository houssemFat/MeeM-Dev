from django.db import models
from django.utils.translation import ugettext_lazy as _
from core.apps.accounts.models import User
from django.db.models.signals import post_save

from teacher.apps.collaboration.models import Collaborator
from teacher.apps.accounts.models import Teacher
from teacher.apps.collaboration.tasks.models import TeacherCollaborationTask
import datetime
 
TEAM_COURSE_RULES = (
    ('A', 'Add'),
    ('D', 'Delete'),
    ('U', 'Update'),
    ('C', 'Create'),
    ('E', 'Evaluate'),
)

class Team(models.Model):
    #id = models.IntegerField(primary_key=True)
    # #CIRTICAL 
    owner = models.ForeignKey(User, db_column="user_id", related_name="teacher_teams")
    members = models.ManyToManyField(Collaborator, through='TeamMemberShip',  related_name='members' )
    name = models.CharField(max_length=255)
    created_at = models.DateField(_("Date"), default=datetime.date.today)
    
    tasks = models.ManyToManyField(TeacherCollaborationTask, through='TeacherCollaborationTeamTask',  related_name='tasks')
    
    class Meta:
        db_table = 'teacher_collaboration_team'
      
class TeamMemberShip(models.Model):
    team = models.ForeignKey(Team, db_column="team_id")
    member = models.ForeignKey(Collaborator, db_column="collaborator_id", related_name='teams')
    is_public =  models.BooleanField(default=True)
    joined_at = models.DateField(_("Date"), default=datetime.date.today)
    
    class Meta:
        db_table = 'teacher_collaboration_team_membership'
        unique_together = ['member', 'team']
    def __str__(self):
        return self.member.username

class TeacherCollaborationTeamTask(models.Model):
    task = models.ForeignKey(TeacherCollaborationTask, db_column="task_id")
    team = models.ForeignKey(Team, db_column="team_id", related_name='assigned_tasks')
    join_at = models.DateTimeField(_("Date join"), auto_now=True, auto_now_add=True)
    class Meta:
        db_table = 'teacher_collaboration_team_task'   
 
       
class TeamRules(models.Model):
    team = models.ForeignKey(Team, db_column="team_id")
    rule = models.CharField(max_length=1, choices=TEAM_COURSE_RULES)
    class Meta:
        db_table = 'teacher_collaboration_rules'

   
def my_callback_team(sender, instance, created, raw, using, **kwargs):
    if created:
        team = Team.objects.create(owner = instance.user, name = 'STAFF').save()
        collaborator = Collaborator.objects.create(owner = instance.user, name = 'STAFF').save()
        TeamMemberShip.objects.create(team=team, member=collaborator)
        return True
    return False
             
post_save.connect(my_callback_team, sender=Teacher)