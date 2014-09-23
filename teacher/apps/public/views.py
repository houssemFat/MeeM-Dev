from django.views.generic import FormView
from .forms import ContactUsForm

# Create your views here.

from teacher.common import render
#from student.apps.accounts.professor.forms import  ProfessorCreationForm 
from core.apps.tools.common import dump_and_render_json 


def home(request):
    if request.user.is_authenticated ():
        from django.forms.models import model_to_dict
        import json
        model = model_to_dict(request.user, ['username', 'email'])
        return render(request, 'thome/in.html', { 'userdata' : json.dumps(model, encoding="utf-8")})
    else :
        return render(request, 'thome/out.html')
