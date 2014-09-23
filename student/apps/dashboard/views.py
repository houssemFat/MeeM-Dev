from django.views.generic import FormView
from student.common import render
from core.apps.tools.common import MeeMJSONEncoder, dump_and_render_json
import json
from teacher.common import get_file_media_url

# User.objects.annotate(page_count=Count('page')).filter(page_count__gte=2).count()
def default(request):
    if request.user.is_authenticated ():
        user = request.user
        user_data = {}
        user_data.update({
                  'username' : user.username.encode('utf8'),
                  'email' : user.email.encode('utf8'),
                  'id' : user.id ,
                  'img_not_found' :  '/images/team/houssem.jpg'.encode('utf8'),
                  'thamb_img_url' : get_file_media_url(user.profile, 'cover'),
                  'studentsCount' : 54,
                  'coursesCount' : 4 ,
                  'collaboratorsCount' : 12,
                  'tasksCount' : 12,
                  'invitationsCount' :  2,
                  });
        data = json.dumps(user_data, encoding="utf-8", cls=MeeMJSONEncoder)
        return render(request,'home/in.html', { 'userdata' : data})
    else :
        return dump_and_render_json(request, None)
    
