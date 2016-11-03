

from django.forms.models import model_to_dict
from django.http import Http404


from core.apps.accounts.models import User as Teacher
from core.apps.tools.common import ClientResponses

from student.apps.courses.models import Course
from student.apps.courses.forum.models import CourseForum


forum_fields = ['title', 'description', 'created_at', 'id']

thread_field = ['content', 'votes_nbr', 'created_at', 'id']

def get_list(request):
    try :
        course = Course.objects.get(id=request.GET['cid'])
        forums = course.forums.select_related('author').all ()
        items = []
        for forum in forums :
            item = model_to_dict(forum, forum_fields)
            item ['author'] = { 'name' : forum.author.username, 'id' : forum.author.id }
            items.append(item)
        response = {'total' : forums.count (), 'list' : items , 'course'  : model_to_dict(course, [ 'id'])}
        return response
    except Course.DoesNotExist :
        raise Http404 ()
    return response

# get 

def get_item(request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        # FIXME , check for user = creator 
        try :
            # #FIXME
            forum = CourseForum.objects.get(id=_id, author=user)
            data = model_to_dict(forum, fields=forum_fields)
            data['course_id'] = forum.course.id
            threads = forum.threads.all()
            threads_ = []
            for thread in threads :
                threads_.append(model_to_dict(thread, fields=thread_field))
            data['responses'] = threads_  
            return data 
        except CourseForum.DoesNotExist:
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

def compose(request):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        from .forms import CourseForumForm
        course_id = request.POST['course_id']
        try : 
            course = Course.objects.get(id=course_id, author=user)
            form = CourseForumForm(request.POST)
            if form.is_valid():
                # FIXME , check for user = creator 
                try :
                    forum = form.create(request, user, course)
                    data = model_to_dict(forum, fields=forum_fields)
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
        from .forms import CourseForumForm
        form = CourseForumForm(request.PUT)
        if form.is_valid():
            # FIXME , check for user = creator 
            try :
                forum = CourseForum.objects.get(id=_id, author=user)
                forum = form.update (request, forum)
                data = model_to_dict(forum, fields=forum_fields)
                return data
            except CourseForum.DoesNotExist:
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
            forum = CourseForum.objects.get(id=_id, author=user)
            forum.delete()
            return ClientResponses.sucessResult
        except CourseForum.DoesNotExist:
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

