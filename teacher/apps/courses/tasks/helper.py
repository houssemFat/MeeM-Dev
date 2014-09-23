

from django.forms.models import model_to_dict
from django.http import Http404


from core.apps.accounts.models import User as Teacher
from core.apps.tools.common import ClientResponses

from student.apps.courses.chapters.models import Chapter
from student.apps.courses.tasks.models import Task
from django.utils.datetime_safe import datetime


task_fields = ['created', 'title', 'id', 'text', 'explanation', 'task_type']

def list(request, id):
    user = request.user
    try :
        chapter = Chapter.objects.get(id=user.id)
        # http://stackoverflow.com/questions/16636191/django-one-to-one-reverse-relationship-doesnotexist
        # http://stackoverflow.com/questions/19788908/onetoone-field-django
        if chapter.taskzes.count () :
            tasks = chapter.tasks.all()
            data = {}
            tasks_ = []
            for task in tasks :
                task_ = model_to_dict(task, fields=task_fields)
                tasks_.append(task_)
            data['list'] = tasks_ 
            return data
        else :
            pass
    except Chapter.DoesNotExist:
        pass
    raise Http404

# get 

def get (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        # FIXME , check for user = creator 
        try :
            # .select_related('taskzes')
            task = Task.objects.get(id=_id, author=user)
            data = model_to_dict(task, fields=task_fields)
            data['chapter_id'] = task.chapter.id
            return data 
        except Task.DoesNotExist:
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

def create(request):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        from .forms import TaskForm
        chapter_id = request.POST['chapter_id']
        try : 
            chapter = Chapter.objects.get(id=chapter_id, author=user)
            form = TaskForm(request.POST)
            if form.is_valid():
                # FIXME , check for user = creator 
                try :
                    task = form.create(request, user, chapter)
                    data = model_to_dict(task, fields=task_fields)
                    data['chapter_id'] = chapter_id
                    return  data
                except Chapter.DoesNotExist:
                    pass
        except Chapter.DoesNotExist :
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

# update 

def update (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        from .forms import TaskForm
        form = TaskForm(request.PUT)
        if form.is_valid():
            # FIXME , check for user = creator 
            try :
                task = Task.objects.get(id=_id, author=user)
                if task :
                    task = form.update (request, task)
                    data = model_to_dict(task, fields=task_fields)
                    data['chapter_id'] = task.chapter.id
                    return data
            except Task.DoesNotExist:
                pass
    except Teacher.DoesNotExist:
        pass
    raise Http404


# delete 

def delete (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        # FIXME , check for user = creator 
        try :
            task = Task.objects.get(id=_id, author=user)
            task.delete()
            return ClientResponses.sucessResult
        except Chapter.DoesNotExist:
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

