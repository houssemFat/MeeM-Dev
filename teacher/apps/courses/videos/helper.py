

from django.forms.models import model_to_dict
from django.http import Http404


from core.apps.accounts.models import User as Teacher
from core.apps.tools.common import ClientResponses
from django.contrib.contenttypes.models import ContentType

from student.apps.courses.chapters.models import Chapter
from student.apps.courses.videos.models import Video, VideoDocument
from django.utils.datetime_safe import datetime


video_fields = ['created', 'title', 'id', 'url', 'description', 'scriptname']
file_fields = ['created', 'host_url', 'title', 'id']

def get_list(request, id):
    try :
        chapter = Chapter.objects.get(pk=id)
        # http://stackoverflow.com/questions/16636191/django-one-to-one-reverse-relationship-doesnotexist
        # http://stackoverflow.com/questions/19788908/onetoone-field-django
        data = { 'list' : [], 'total' : 0}
        if chapter.videos.count () :
            videos = chapter.videos.all()
            videos_ = []
            for video in videos :
                video_ = model_to_dict(video, fields=video_fields)
                videos_.append(video_)
            data['list'] = videos_
            data['total'] = len(videos_);
        return data
    except Chapter.DoesNotExist, e:
        return e
    raise Http404

def list_video_file(request, id):
    user = request.user
    try :
        video = Video.objects.get(id=user.id)
        # http://stackoverflow.com/questions/16636191/django-one-to-one-reverse-relationship-doesnotexist
        # http://stackoverflow.com/questions/19788908/onetoone-field-django
        if video.files.count () :
            files = video.files.all()
            data = {}
            files_ = []
            for file in files :
                file_ = model_to_dict(file, fields=file_fields)
                files_.append(file_)
            data['list'] = files_ 
            return data
        else :
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

# get 

def get (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        # FIXME , check for user = creator 
        try :
            # .select_related('quizzes')
            video = Video.objects.get(id=_id, author=user)
            data = model_to_dict(video, fields=video_fields)
            data['chapter_id'] = video.chapter.id
            data['content_type'] = ContentType.objects.get_for_model(video).id
            documents = video.documents.select_related('document').all()
            documents_ = []
            for document in documents :
                documents_.append(model_to_dict(document.document, fields=['created', 'title', 'id']))
            data['documents'] = documents_  
            return data 
        except Video.DoesNotExist:
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

def create(request):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        from .forms import VideoForm
        chapter_id = request.POST['chapter_id']
        try : 
            chapter = Chapter.objects.get(id=chapter_id, creator=user)
            form = VideoForm(request.POST)
            if form.is_valid():
                # FIXME , check for user = creator 
                try :
                    video = form.create(request, user, chapter)
                    data = model_to_dict(video, fields=video_fields)
                    data['chapter_id'] = video.chapter.id
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
        from .forms import VideoForm
        form = VideoForm(request.PUT)
        if form.is_valid():
            # FIXME , check for user = creator 
            try :
                video = Video.objects.get(id=_id, author=user)
                if video :
                    video = form.update (request, video)
                    data = model_to_dict(video, fields=video_fields)
                    data['chapter_id'] = video.chapter.id
                    return data
            except Video.DoesNotExist:
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
            event = Chapter.objects.get(id=_id, author=user)
            event.delete()
            return ClientResponses.sucessResult
        except Chapter.DoesNotExist:
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

# upload script 
def upload_script (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        try :
            from .forms import VideoScriptForm
            form = VideoScriptForm(request.POST, request.FILES)
            if form.is_valid():
                if ('id' in request.POST) and (request.POST['id'] != None) :
                    video = Video.objects.get(id=request.POST['id'], author=user)
                    video = form.update(request, video, request.FILES['script_file'])
                else :
                    chapter = Chapter.objects.get(id=_id)
                    video = form.create(request, user, chapter, request.FILES['script_file'])
                data = model_to_dict(video, fields=video_fields)
                data['chapter_id'] = video.chapter.id
                return data
        except Chapter.DoesNotExist:
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404


# upload script 
def attach_new_file (document, video):
    document = VideoDocument(document=document, video=video)
    try :
        document.save ()
        data = model_to_dict(document, fields=file_fields)
        data['chapter_id'] = video.chapter.id
        return data
    except Exception:
        pass
    raise Http404