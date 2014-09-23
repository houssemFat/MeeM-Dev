# Create your views here.
from .models import Chapter 
from core.apps.tools.common import dump_and_render_json 

# view a chapter in details
def statistics(request, id):
    #if request.user.is_authenticated ():
    item =  Chapter.objects.get(pk=id)
    
    result = {'id' : item.id, 'title' : str(item.title)}
    return dump_and_render_json (request, result)

def view (request, id):
    #if request.user.is_authenticated ():
    item =  Chapter.objects.get(pk=id)
    question_list = []
    for quiz in item.quizzes.all():
        quizzes_ = []
        for question in quiz.questions.all():
            quizzes_.append ({'id' : question.id, 'value' : True})
        question_list.append ({'id' : question.id, 'value' : str(question.value), 'values' : str(question.responses), 'responses' : quizzes_, 'appear_at' : 20 })
    
    result = {'id' : item.id, 'title' : str(item.title), 'qcm_questions' : question_list, 'qcounts' : len (question_list)}
    return dump_and_render_json (request, result)