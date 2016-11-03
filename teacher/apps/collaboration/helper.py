from core.apps.accounts.models import User
from teacher.apps.collaboration.teams.models import Team
from teacher.apps.collaboration.models import Collaborator

from django.http import Http404
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict

js_user_fields = ['id', 'username']
js_team_fields = ['id', 'name']

@login_required
def member_list(request):
    user = request.user
    result = {}
    try :
        me = User.objects.get(id=user.id)
        # Members
        if me.my_collaborators.select_related().count () :
            members = me.my_collaborators.select_related().all()
        
        members_  = []
        for member in members :
            member_ =  model_to_dict(member, ['id'])
            member_['user'] = model_to_dict(member.user, js_user_fields)
            member_['teams'] = []
            if member.teams.count () > 0 :
                member_['teams'] = [x.team.id for x in member.teams.all()] 
            members_.append(member_)
        result['list'] = members_
        # teams
        teams_ = []
        if me.teacher_teams.select_related('members').count () :
            teams = me.teacher_teams.all()
        for team in teams :
            team_ = model_to_dict(team, js_team_fields)
            team_.update({'count' : team.members.count()})
            teams_.append(team_)
        result['teams'] = teams_
        
        return result
    except Exception as e :
        return e
    #raise Http404

# get 
def get (request, _id):
    user = request.user
    try :
        me = User.objects.get(id=user.id)
        member = User.objects.get(id=_id)
        #FIXME , check for owner = me 
        try :
            member = Collaborator.objects.get (source=me, user=member)
            return   model_to_dict(member.user, fields=js_user_fields)
        except Team.DoesNotExist:
            pass
    except User.DoesNotExist:
        pass
    raise Http404
