

from django.forms.models import model_to_dict
from django.http import Http404


from core.apps.accounts.models import User as Teacher
from core.apps.tools.helper import date as dateHelper
from core.apps.tools.common import ClientResponses

from student.apps.courses.models import Course
from student.apps.courses.chapters.models import Chapter, ChapterQuizz
from student.apps.courses.quizzes.models import Quiz


quiz_fields = ['created', 'about', 'id', 'display_type', 'in_grade',
               'duration' , 'is_timed', 'note', 'max_attempts', 'end_at', 'due_at']

question_fields = ['created', 'question', 'id', 'note', 'with_input' ,
                    'help', 'max_attempts', 'question_type' ,'order']


response_fields = ['response', 'id', 'is_true', 'order']

def get_list(request, module, id):
    user = request.user
    model_klass = Course
    if module == 'chapter' :
        model_klass = Chapter
    try :
        parent = model_klass.objects.get(id=id)
        # http://stackoverflow.com/questions/16636191/django-one-to-one-reverse-relationship-doesnotexist
        # http://stackoverflow.com/questions/19788908/onetoone-field-django
        quizzes_ = []
        data = {}
        
        if parent.quizzes.count () :
            quizzes = parent.quizzes.all()
            for quiz in quizzes :
                quiz_ = model_to_dict(quiz, fields=quiz_fields)
                quizzes_.append(quiz_)
                
        data['list'] = quizzes_ 
        data['count'] = len(quizzes_)
        return data
    except model_klass.DoesNotExist:
        pass
    raise Http404

# get 
def get_item (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        # FIXME , check for user = creator 
        try :
            # .select_related('quizzes')
            quiz = Quiz.objects.get(id=_id, author=user)
            data = model_to_dict(quiz, fields=quiz_fields)
            data['course_id'] = quiz.course.id
            try :
                related_chapter = quiz.chapter.get(quiz=quiz)
                data['chapter_id'] = related_chapter.chapter.id
            except ChapterQuizz.DoesNotExist, e:
                pass
            questions = quiz.questions.select_related('responses').all()
            questions_ = []
            # run over question
            for question in questions :
                question_ = model_to_dict(question, fields=question_fields)
                responses_ = []
                responses = question.responses.all()
                # run over responses
                for response in  responses:
                    responses_.append(model_to_dict(response, fields=response_fields))
                
                question_ ['responses'] = responses_
                questions_.append(question_)
                
            data['questions'] = questions_  
            return data 
        except Quiz.DoesNotExist:
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

def create(request):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        from .forms import QuizForm
        form = QuizForm(request.POST)
        if form.is_valid():
            # FIXME , check for user = creator 
            try :
                quiz = form.create(request, user)
                data = model_to_dict(quiz, fields=quiz_fields)
                return  data
            except Exception:
                pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

# update 
def update (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        from .forms import QuizForm
        # changed since django 1.7 to request.PUT
        form = QuizForm(request.PUT)
        if form.is_valid():
            # FIXME , check for user = creator 
            try :
                quiz = Quiz.objects.get(id=_id, author=user)
                if quiz :
                    quiz = form.update (request, quiz)
                    data = model_to_dict(quiz, fields=quiz_fields)
                    data['course_id'] = quiz.course.id
                    
                    return data
            except Quiz.DoesNotExist, e:
                return e
    except Teacher.DoesNotExist, e:
         return e
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

