from django.http import Http404
from core.apps.accounts.models import User as Teacher

from student.apps.courses.chapters.models import Chapter
from django.forms.models import model_to_dict

document_fields = ['title', 'id', 'created']

def get_list(request):
    try :
        id = request.GET['cid']
        try :
            user = Teacher.objects.get (pk=request.user.id)
            try :
                chapter = Chapter.objects.get (pk=id, author=user)
                documents = chapter.documents.select_related('document').all()
                data = dict ()
                documents_ = []
                for document in documents :
                    document_ = model_to_dict(document, fields=document_fields)
                    documents_.append(document_)
                data['chapter_id'] =  chapter.id
                data['list'] = documents_ 
                return data 
            except Chapter.DoesNotExist:
                    pass
        except Teacher.DoesNotExist:
            pass
    except Exception :
        pass
    raise Http404


def upload_file (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        try :
            chapter = Chapter.objects.get(id=_id)
            from .forms import DocumentForm
            file = request.FILES['course_document']
            title = file.name ;
            form = DocumentForm({ 'title' : title }, request.FILES)
            if form.is_valid():
                document = form.create(request, user, chapter, file)
                return document
        except Chapter.DoesNotExist:
            pass
    except Chapter.DoesNotExist:
        pass
    raise Http404
