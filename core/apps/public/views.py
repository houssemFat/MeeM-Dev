from django.views.generic import FormView
from .forms import ContactUsForm

# Create your views here.
from django.shortcuts import render
from core.apps.courses.models import Course
from core.apps.accounts.professor.forms import  ProfessorCreationForm 
from core.apps.tools.common import dump_and_render_json 

def home(request):
    if request.user.is_authenticated ():
        from django.forms.models import model_to_dict
        import json
        model = model_to_dict(request.user, ['username', 'email'])
        return render(request, 'home/in.html', { 'userdata' : json.dumps(model, encoding="utf-8")})
    else :
        return render(request, 'home/out.html')
    """
    import sys
    sys.path.append('C:\\Program Files (x86)\\aptana\\plugins\\org.python.pydev_2.7.0.2013032300\\pysrc')
    from django.template.loader import render_to_string
    from django.utils import translation
    from django.utils.translation import ugettext_lazy as _
    
    dict = {'username' : 'houssem'}
    dict.update({'site_name' : 'wxxcv'})
    dict.update({'activate_url' : 'gfg'})
    if translation.check_for_language('fr'):
        request.session['django_language'] = 'fr'
        return render(request, 'accounts/professor/email/email_confirmation_message.html', dict)
    else :
        return render(request, 'home/base.html')
    #request.LANGUAGE_CODE = 'fr'
    #request.session['django_language'] = 'fr'
    #return render(request, 'accounts/professor/email/email_confirmation_message.html', dict)
    #else :
    #return render(request, 'public/register.html', {'register_form': ProfessorCreationForm()})
"""

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
