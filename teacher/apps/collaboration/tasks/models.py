from django.db import models
from core.apps.accounts.models import User
from django.utils.translation import ugettext_lazy as _
import datetime
        
class TaskLabelColor(models.Model):
    title = models.CharField(max_length=255)
    creator = models.ForeignKey(User, blank=True, null=True,  related_name='task_labels')
    color = models.CharField(_("Color"), max_length=7)
    class Meta:
        db_table = 'teacher_collaboration_task_label'
    

TASK_STATES = (
    ('D', 'Done'),
    ('S', 'STARTED'),
    ('F', 'FINISHED'),
)
        
class TeacherCollaborationTask(models.Model):
    title = models.CharField(max_length=255)
    creator = models.ForeignKey(User, db_column="user_id", related_name='collaboration_tasks')
    created = models.DateTimeField(_("Created at"))
    start = models.DateTimeField(_("Date start"))
    end = models.DateTimeField(_("Date end"))
    label = models.ForeignKey(TaskLabelColor, db_column="label_id")
    progress = models.PositiveIntegerField(max_length=3)
    state = models.CharField(max_length=1, choices=TASK_STATES, default='S')
    class Meta:
        db_table = 'teacher_collaboration_task'
        ordering = ('-end',)
    
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = datetime.datetime.now ()

        return super(TeacherCollaborationTask, self).save(*args, **kwargs)