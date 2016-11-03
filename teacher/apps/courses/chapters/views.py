
from django.http import Http404
import json

from core.apps.tools.common import render_json,   MeeMJSONEncoder
from core.apps.accounts.models import User as Teacher

from student.apps.courses.models import Course

from . import helper

# get the list of chapter or create a new 
def default(request):
    if request.user.is_authenticated ():
        if not request.method in ( 'GET'  , 'POST' ):
            raise Http404()
        else :
            #list
            if request.method == 'GET' :
                try :
                    id = request.GET['cid']
                except Exception:
                    raise Http404()
                page = 1
                try :
                    page = int(request.GET['page'])
                except Exception:
                    pass
                try :
                    user = Teacher.objects.get (pk=request.user.id)
                    try :
                        course = Course.objects.get (pk=id, author=user)
                        chapters = course.chapters.order_by('created')[(page - 1)*4: page * 4] 
                        from django.forms.models import model_to_dict
                        data = dict ()
                        chapters_ = []
                        for chapter in chapters :
                            chapter_ = model_to_dict(chapter, fields=['title', 'created_at', 'about', 'id'])
                            chapters_.append(chapter_)
                        data['list'] =   chapters_ 
                        data['total'] =   course.chapters.count ()
                        return render_json(request, json.dumps(data, encoding="utf-8", cls = MeeMJSONEncoder))
                    except Course.DoesNotExist:
                            pass
                except Teacher.DoesNotExist:
                    pass
            else :
            #create 
                pass
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
            data =  helper.delete (request, id)
    data = json.dumps(data, encoding="utf-8", cls = MeeMJSONEncoder)
    return render_json(request, data)
