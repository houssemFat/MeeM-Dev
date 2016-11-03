from django.forms.models import model_to_dict
from django.db.models import Count
from django.core.paginator import Paginator
import json

from core.apps.tools.common import render_json, dump_and_render_json,\
    MeeMJSONEncoder
from core.apps.accounts.models import User 
from core.apps.history.models import UserLogEntry 

from teacher.apps.collaboration.models import Collaborator
from teacher.apps.collaboration.models import CollaboratorInvitation
from teacher.apps.collaboration.teams.models import Team, TeamMemberShip
from teacher.common import get_file_media_url


# User.objects.annotate(page_count=Count('page')).filter(page_count__gte=2).count()
def default(request):
    if request.user.is_authenticated ():
        userid = request.user.id
        user = User.objects.select_related().get(pk=userid)
        model = model_to_dict(user, ['username', 'email'])
        invitations_count = CollaboratorInvitation.objects.filter(fromuser=user.id).count()
        invitations_recieved = CollaboratorInvitation.objects.filter(usermail=user.email).count()
        studentCount = 0
        course_count = 0
        courses = user.courses.all ()
        for course in courses :
            studentCount = studentCount + course.students.count ()
            course_count = course_count + 1
        
        staff_count = Team.objects.annotate(staff_count=Count('members')).filter(owner=user).values ('staff_count')
        staff_count = staff_count[0]['staff_count']
        
        """
        collaborations = user.my_collaborators.select_related().all()
        other_collaborations = user.my_collaborators_with_others.select_related().all()
        """
        collaborators = Collaborator.objects.filter(source=user).all ()
        member_in_teams = TeamMemberShip.objects.filter(member__in=collaborators).select_related('team', 'assigned_tasks').all ()
        tasks_count = 0
        todos = []
        # FIXME
        for item in member_in_teams :
            tasks_count += item.team.assigned_tasks.count()
            for task in item.team.tasks.all() :
                task_ = model_to_dict(task, ['id', 'start', 'end', 'title'])
                if getattr(task, 'label', False):
                    task_.update({ 'color' : task.label.color})
                else :
                    task_.update({ 'color' : '#ccc'})
                todos.append(task_)
        model.update({
                  'id' : user.id ,
                  'username' :  user.email,
                  'img_not_found' :  '/images/team/houssem.jpg',
                  'thamb_img_url' : get_file_media_url (user.profile.cover, 'location'),
                  'studentsCount' : studentCount,
                  'coursesCount' : course_count ,
                  'collaboratorsCount' : staff_count,
                  'tasksCount' : tasks_count,
                  'invitations_sent_count' :  invitations_count,
                  'invitations_recieved_count' :  invitations_recieved,
                  'progress' :  get_profile_progress(user),
                  });
        recents = user.history.all()
        paginator = Paginator(recents, 10)
        recents_activities = paginator.page(1)
        recents_activities_list = []
        for item in recents_activities :
            item_ = model_to_dict(item, fields=['id', 'action_time', 'object_id'])
            item_.update({'model' : item.content_type.model})
            recents_activities_list.append(item_) #.push(item_)
        
        model.update({'history' : recents_activities_list})
        model.update({'todos' : todos})
        return render_json(request, json.dumps(model, encoding="utf-8", cls=MeeMJSONEncoder))
    else :
        return dump_and_render_json(request, None)
    
def get_profile_progress(user) :
    # privacy
    # lang
    # web sites
    # emails
    # location
    return 15
