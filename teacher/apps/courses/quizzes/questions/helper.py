

from django.forms.models import model_to_dict
from django.http import Http404

import json

from core.apps.accounts.models import User as Teacher
from core.apps.tools.common import ClientResponses

from student.apps.courses.chapters.models import Chapter
from student.apps.courses.quizzes.models import Quiz, QuizQuestion, QuizQuestionResponse


quiz_fields = ['created', 'question', 'id', 'note', 'with_input' , 'help', 'max_attempts', 'quiz_type']

response_fields = ['text', 'is_true']

def get_list(request, id):
    user = request.user
    try :
        quiz = Quiz.objects.get(author=user.id, )
        # http://stackoverflow.com/questions/16636191/django-one-to-one-reverse-relationship-doesnotexist
        # http://stackoverflow.com/questions/19788908/onetoone-field-django
        if quiz.questions.count () :
            questions = quiz.quizs.all()
            data = {}
            questions_ = []
            for question in questions :
                question_ = model_to_dict(question, fields=quiz_fields)
                question_['quiz_id'] = question.quiz.id
                questions_.append(question_)
            data['list'] = question_ 
            return data
        else :
            pass
    except Chapter.DoesNotExist:
        pass
    raise Http404

# get 
def get_item (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        # FIXME , check for user = creator 
        try :
            question = QuizQuestion.objects.get(id=_id, author=user)
            data = model_to_dict(question, fields=quiz_fields)
            data['quiz_id'] = question.quiz.chapter.id
            responses = question.responses.all()
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
        from .forms import QuizQuestionForm
        quiz_id = request.POST['quizz_id']
        try : 
            quiz = Quiz.objects.get(id=quiz_id, author=user)
            form = QuizQuestionForm(request.POST)
            if form.is_valid():
                # FIXME , check for user = creator 
                try :
                    question = form.create(request, user, quiz)
                    data = model_to_dict(question, fields=quiz_fields)
                    update_or_create_responses(request, 'PUT', question)
                    data['quiz_id'] = quiz_id
                    return  data
                except Exception, e:
                    return e
        except Quiz.DoesNotExist, e:
            return e
    except Teacher.DoesNotExist:
        pass
    raise Http404

# update 
def update (request, _id):
    user = request.user
    try :
        user = Teacher.objects.get(id=user.id)
        from .forms import QuizQuestionForm
        form = QuizQuestionForm(request.PUT)
        if form.is_valid():
            # FIXME , check for user = creator 
            try :
                question = QuizQuestion.objects.get(id=_id, author=user)
                if question :
                    question = form.update (request, question)
                    data = model_to_dict(question, fields=quiz_fields)
                    data['quiz_id'] = question.quiz.id
                    update_or_create_responses(request, 'PUT', question)
                    return data
            except Quiz.DoesNotExist:
                pass
    except Teacher.DoesNotExist:
        pass
    raise Http404

def update_or_create_responses(request, method, question):
    data =  getattr(request, method)
    responses = json.loads (data['responses'])
    index = 0
    for response in responses :
        id = None
        if 'id' in response :
            id = response['id']
        #FIXME remove it from js
        if 'csrfmiddlewaretoken' in response :
            response.pop("csrfmiddlewaretoken", None)
        response.update({'question' : question})
        response.update({'author' : question.author})
        model = QuizQuestionResponse.objects.update_or_create(id=id, defaults=response)
        index +=1
    
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
