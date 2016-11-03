# Create your views here.
from django.shortcuts import render
from student.apps.courses.models import Course
from core.apps.tools.common import dump_and_render_json 

def home(request):
    if request.user.is_authenticated ():
        from django.forms.models import model_to_dict
        import json
        model = model_to_dict(request.user, ['username', 'email'])
        return render(request, 'home/in.html', { 'userdata' : json.dumps(model, encoding="utf-8")})
    else :
        return render(request, 'home/out.html')
    

def list(request):
    #if request.user.is_authenticated ():
    list = []
    items =  Course.objects.all()
    for item in items:
        list.append ({'id' : item.id, 'title' : str(item.title), 'ccount' : item.chapter_set.count()})
    return dump_and_render_json (request, list)
    #else :
    #return render(request, 'public/register.html', {'register_form': ProfessorCreationForm()})

def view(request, id):
    #if request.user.is_authenticated ():
    item =  Course.objects.get(pk=id)
    student_list = []
    for student in item.students.all():
        student_list.append ({'id' : student.id, 'username' : str(student.username)})
    result = {'id' : item.id, 'title' : str(item.title), 'scount' : item.students.count(), 'students' : student_list}
    return dump_and_render_json (request, result)
