
from django.http import Http404
import json

from core.apps.tools.common import render_json, dump_and_render_json, MeeMJSONEncoder
from core.apps.accounts.models import User as Teacher

from student.apps.courses.chapters.models import Chapter

from . import helper

# get the list of chapter or create a new 
def default(request):
    if request.user.is_authenticated ():
        if not request.method in ('GET'  , 'POST'):
            raise Http404()
        else :
            # list
            if request.method == 'GET' :
                try :
                    id = request.GET['cid']
                    try :
                        user = Teacher.objects.get (pk=request.user.id)
                        try :
                            chapter = Chapter.objects.get (pk=id, author=user)
                            quizzes = chapter.quizzes.all()
                            from django.forms.models import model_to_dict
                            data = dict ()
                            quizzes_ = []
                            for quiz in quizzes :
                                quiz_ = model_to_dict(quiz, helper.quiz_fields)
                                responses_ =[]
                                if quiz.responses.count () > 0 :
                                    for response in quiz.responses.all() :
                                        response_ = model_to_dict(response, fields=['title', 'created_at', 'about', 'id'])
                                        responses_.append(response_)
                                    quiz_['responses'] = responses_ 
                                quizzes_.append(quiz_)
                            data['list'] = quizzes_ 
                            return render_json(request, json.dumps(data, encoding="utf-8", cls=MeeMJSONEncoder))
                        except Chapter.DoesNotExist:
                                pass
                    except Teacher.DoesNotExist:
                        pass
                
                except :
                    pass
            # create, post method  
            else :
                data = helper.create(request) 
                return render_json(request, json.dumps(data, encoding="utf-8", cls=MeeMJSONEncoder))
    raise Http404()

# read ,  update , delete
def rud(request, id):
    data = {'result' : 'forbidden'}
    if request.user.is_authenticated ():
        if request.method == 'GET' :
            data = helper.get (request, id)
        if request.method == 'PUT' :
            data = helper.update (request, id)
        if request.method == 'DELETE' :
            data = helper.delete (request, id)
    data = json.dumps(data, encoding="utf-8", cls=MeeMJSONEncoder)
    return render_json(request, data)
