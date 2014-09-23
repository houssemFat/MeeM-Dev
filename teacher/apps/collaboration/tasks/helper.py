
from django.http import Http404
from django.views.decorators.http import require_POST
from teacher.apps.collaboration.teams.models import Team
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from core.apps.accounts.models import User as Member
from core.apps.tools.helper import date as dateHelper
from core.apps.tools.common import models_to_dict
from django.forms.models import model_to_dict

from teacher.apps.collaboration.tasks.models import TeacherCollaborationTask as Task, TaskLabelColor



fields=['created', 'title', 'start', 'end', 'id']
team_fields=['id', 'name']
label_fields=['id', 'color', 'title']

def task_list(request):
    user = request.user
    try :
        user = Member.objects.get(id=user.id)
        data = {}
        # http://stackoverflow.com/questions/16636191/django-one-to-one-reverse-relationship-doesnotexist
        # http://stackoverflow.com/questions/19788908/onetoone-field-django
        if user.collaboration_tasks.count () :
            tasks = user.collaboration_tasks.all()
            data['list'] = models_to_dict(tasks, fields)
            labels = TaskLabelColor.objects.filter(Q(creator=user) | Q(creator__isnull=True))
            data['labels'] = models_to_dict(labels, label_fields)
            return data
    except Member.DoesNotExist, e:
        return e
    raise Http404


# get 
def get (request, _id):
    user = request.user
    try :
        user = Member.objects.get(id=user.id)
        #FIXME , check for user = creator 
        try :
            task = Task.objects.get(id=_id, creator = user)
            teams_ = []
            teams = []
            if user.teacher_teams.count () :
                teams = user.teacher_teams.all()
                teams_.append(models_to_dict(teams, fields=team_fields))
            data =  model_to_dict(task, fields=fields)
            data['teams'] = teams_
            labels = TaskLabelColor.objects.filter(Q(creator=user) | Q(creator__isnull=True))
            data['labels'] = models_to_dict(labels, label_fields)
            try :
                data['label'] = model_to_dict(task.label, fields=label_fields)
            except TaskLabelColor.DoesNotExist:
                data['label'] = model_to_dict(labels[0], fields=label_fields)
            return data 
        except Task.DoesNotExist:
            pass
    except Member.DoesNotExist:
        pass
    raise Http404

@login_required
@require_POST
def create(request):
    user = request.user
    try :
        user = Member.objects.get(id=user.id)
        from .forms import TaskForm
        data = {
                'start' : dateHelper.strptime(request.POST['start']),
                'end' : dateHelper.strptime (request.POST['end']),
                'color' : request.POST['color'][1:],
                'title' : request.POST['title']
                }
        form = TaskForm(data)
        if form.is_valid():
            event = form.create(request, user)
            return model_to_dict(event, fields=fields)
    except Member.DoesNotExist:
        pass
    raise Http404

# update 
@login_required
def update (request, _id):
    user = request.user
    try :
        user = Member.objects.get(id=user.id)
        from .forms import TaskForm
        start = dateHelper.strptime (request.PUT['start'])
        end= dateHelper.strptime (request.PUT['end'])
        label = TaskLabelColor.objects.get(pk=request.PUT['label'])
        data = {
                'start' : start,
                'end' : end,
                'label' : label,
                'title' : request.PUT['title']
                }
        form = TaskForm(data)
        if form.is_valid():
            #FIXME , check for user = creator 
            try :
                event = Task.objects.get(id=_id, creator = user)
                if event :
                    event = form.update (request, event)
                    return model_to_dict(event, fields=fields)
            except Task.DoesNotExist:
                pass
    except Member.DoesNotExist:
        pass
    raise Http404


# delete 
@login_required
def delete (request, _id):
    user = request.user
    try :
        user = Member.objects.get(id=user.id)
        #FIXME , check for user = creator 
        try :
            event = Task.objects.get(id=_id, creator = user)
            event.delete()
        except Task.DoesNotExist:
            pass
    except Member.DoesNotExist:
        pass
    raise Http404
