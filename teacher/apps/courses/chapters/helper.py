

from django.forms.models import model_to_dict
from django.http import Http404
from django.contrib.contenttypes.models import ContentType
from core.apps.accounts.models import User as Member


from core.apps.tools.helper import date as dateHelper
from core.apps.comments.models import Comment
from core.apps.tools.common import ClientResponses

from student.apps.courses.chapters.models import Chapter



fields = ['created', 'title', 'id']

def _list(request):
    user = request.user
    try :
        me = Member.objects.get(id=user.id)
        # http://stackoverflow.com/questions/16636191/django-one-to-one-reverse-relationship-doesnotexist
        # http://stackoverflow.com/questions/19788908/onetoone-field-django
        if me.collaboration_tasks.count () :
            tasks = me.collaboration_tasks.all()
            data = {}
            tasks_ = []
            for event in tasks :
                event_ = model_to_dict(event, fields=fields)
                tasks_.append(event_)
            data['list'] = tasks_ 
            return data
        else :
            pass
    except Member.DoesNotExist:
        pass
    raise Http404


# update 
def get (request, _id):
    user = request.user
    try :
        user = Member.objects.get(id=user.id)
        # FIXME , check for user = creator 
        try :
            #.select_related('quizzes')
            chapter = Chapter.objects.get(id=_id, author = user)
            response = {}
            response['documentsCount'] = chapter.documents.count()
            content_type = ContentType.objects.get_for_model(chapter).id
            
            response['commentsCount'] = Comment.objects.filter (content_type=content_type, object_id=_id).count()
            response['mediatcount'] = chapter.videos.count() 
            response['assignementCount'] = 3
            response['content_type'] = content_type
            response.update (model_to_dict(chapter, fields=fields))
            return  response 
        except Chapter.DoesNotExist:
            pass
        return ClientResponses.unknowResult
    except Member.DoesNotExist:
        pass
    raise Http404

def create(request):
    user = request.user
    try :
        user = Member.objects.get(id=user.id)
        from .forms import ChapterForm
        data = {
                'start' : dateHelper.strptime(request.POST['start']),
                'end' : dateHelper.strptime (request.POST['end']),
                'color' : request.POST['color'][1:],
                'title' : request.POST['title']
                }
        form = ChapterForm(data)
        if form.is_valid():
            event = form.create(request, user)
            return model_to_dict(event, fields=fields)
    except Member.DoesNotExist:
        pass
    raise Http404

# update 
def update (request, _id):
    user = request.user
    try :
        user = Member.objects.get(id=user.id)
        start = dateHelper.strptime (request.PUT['start'])
        end = dateHelper.strptime (request.PUT['end'])
        data = {
                'start' : start,
                'end' : end,
                'color' : request.PUT['color'][1:],
                'title' : request.PUT['title']
                }
        form = Chapter(data)
        if form.is_valid():
            # FIXME , check for user = creator 
            try :
                event = Chapter.objects.get(id=_id, creator=user)
                if event :
                    event = form.update (request, event)
                    return model_to_dict(event, fields=fields)
            except Chapter.DoesNotExist:
                pass
            return ClientResponses.unknowResult
    except Member.DoesNotExist:
        pass
    raise Http404


# delete 
def delete (request, _id):
    user = request.user
    try :
        user = Member.objects.get(id=user.id)
        # FIXME , check for user = creator 
        try :
            event = Chapter.objects.get(id=_id, creator=user)
            event.delete()
            return ClientResponses.sucessResult
        except Chapter.DoesNotExist:
            pass
    except Member.DoesNotExist:
        pass
    raise Http404
