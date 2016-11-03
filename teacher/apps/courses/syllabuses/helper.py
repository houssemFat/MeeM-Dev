

from django.forms.models import model_to_dict
from django.http import Http404


from core.apps.accounts.models import User as Teacher
from core.apps.tools.common import ClientResponses

from student.apps.courses.models import Course
from student.apps.courses.syllabuses.models import Syllabus
from django.utils.datetime_safe import datetime


syllabus_fields = ['created_at', 'title', 'id', 'title', 'about', 'last_update']

def get_list(request, id):
    user = request.user
    try :
        parent = Course.objects.get(id=id)
        # http://stackoverflow.com/questions/16636191/django-one-to-one-reverse-relationship-doesnotexist
        # http://stackoverflow.com/questions/19788908/onetoone-field-django
        syllabus_ = []
        data = {}
        
        if parent.syllabuses.count () :
            syllabuss = parent.syllabuss.all()
            for syllabus in syllabuss :
                syllabus_ = model_to_dict(syllabus, fields=syllabus_fields)
                syllabus_.append(syllabus_)
                
        data['list'] = syllabus_ 
        data['count'] = len(syllabus_)
        return data
    except Course.DoesNotExist:
        pass
    raise Http404

# get 
def get_item (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        # FIXME , check for user = creator 
        try :
            # .select_related('syllabus')
            syllabus = Syllabus.objects.get(id=_id, author=user)
            data = model_to_dict(syllabus, fields=syllabus_fields)
            data['course_id'] = syllabus.course.id
            return data 
        except Syllabus.DoesNotExist:
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

def create(request):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        from .forms import SyllabusForm
        course_id = request.POST['chapter_id']
        try : 
            course = Course.objects.get(id=course_id, author=user)
            form = SyllabusForm(request.POST)
            if form.is_valid():
                # FIXME , check for user = creator 
                try :
                    syllabus = form.create(request, user, course)
                    data = model_to_dict(syllabus, fields=syllabus_fields)
                    data['course_id'] = course_id
                    return  data
                except Course.DoesNotExist:
                    pass
        except Course.DoesNotExist :
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

# update 
def update (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        from .forms import SyllabusForm
        form = SyllabusForm(request.PUT)
        if form.is_valid():
            # FIXME , check for user = creator 
            try :
                syllabus = Syllabus.objects.get(id=_id, author=user)
                if syllabus :
                    syllabus = form.update (request, syllabus)
                    data = model_to_dict(syllabus, fields=syllabus_fields)
                    data['course_id'] = syllabus.course.id
                    return data
            except Syllabus.DoesNotExist:
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
            event = Course.objects.get(id=_id, author=user)
            event.delete()
            return ClientResponses.sucessResult
        except Course.DoesNotExist:
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

