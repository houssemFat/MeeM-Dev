

from django.forms.models import model_to_dict
from django.http import Http404


from core.apps.accounts.models import User as Teacher
from core.apps.tools.common import ClientResponses

from student.apps.courses.quizzes.models import Quiz, QuizQuestionResponse, QuizQuestion

from .forms import QuizQuestionResponseForm

quiz_fields = ['created', 'title', 'id', 'text', 'explanation', 'quiz_type']

response_fields = ['text', 'is_true']

def get_list(request, id):
    try :
        question = QuizQuestion.objects.get(pk=id, author=request.user.id)
        # http://stackoverflow.com/questions/16636191/django-one-to-one-reverse-relationship-doesnotexist
        # http://stackoverflow.com/questions/19788908/onetoone-field-django
        if question.responses.count () :
            responses = question.responses.all()
            data = {}
            responses_ = []
            for quiz in responses :
                quiz_ = model_to_dict(quiz, fields=quiz_fields)
                responses_.append(quiz_)
            data['list'] = responses_ 
            data['count'] = len(responses_) 
            return data
        else :
            pass
    except QuizQuestion.DoesNotExist:
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
            quiz = QuizQuestionResponse.objects.get(id=_id, author=user)
            data = model_to_dict(quiz, fields=quiz_fields)
            data['question_id'] = quiz.question.id
            responses = quiz.responses.all()
            responses_ = []
            for response in responses :
                responses_.append(model_to_dict(response, fields=response_fields))
            data['responses'] = responses_  
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
        question_id = request.POST['question_id']
        try : 
            question = QuizQuestionResponse.objects.get(id=question_id, author=user)
            form = QuizQuestionResponseForm(request.POST)
            if form.is_valid():
                # FIXME , check for user = creator 
                try :
                    quiz = form.create(request, user, question)
                    data = model_to_dict(quiz, fields=quiz_fields)
                    data['question_id'] = question_id
                    return  data
                except QuizQuestionResponse.DoesNotExist:
                    pass
        except QuizQuestionResponse.DoesNotExist :
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

# update 

def update (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        from .forms import QuizQuestionResponseForm
        form = QuizQuestionResponseForm(request.PUT)
        if form.is_valid():
            # FIXME , check for user = creator 
            try :
                quiz = Quiz.objects.get(id=_id, author=user)
                if quiz :
                    quiz = form.update (request, quiz)
                    data = model_to_dict(quiz, fields=quiz_fields)
                    data['question_id'] = quiz.question.id
                    return data
            except Quiz.DoesNotExist:
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
            event = QuizQuestionResponse.objects.get(id=_id, author=user)
            event.delete()
            return ClientResponses.sucessResult
        except QuizQuestionResponse.DoesNotExist:
            pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

# upload script 
def create_response (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        try :
            quiz = Quiz.objects.get(id=_id)
            from .forms import QuizQuestionResponseForm
            file = request.FILES['quiz_file']
            title = file.name ;
            form = QuizQuestionResponseForm({ 'title' : title }, request.FILES)
            if form.is_valid():
                file = form.create(request, user, quiz, file)
                return model_to_dict(file, fields=['title', 'id', 'created'])
        except Quiz.DoesNotExist:
            pass
    except Quiz.DoesNotExist:
        pass
    raise Http404
