from core.apps.accounts.models import User
from django.db.models import Q
from django.db.models import Count
from teacher.apps.collaboration.teams.models import Team, TeamMemberShip
from teacher.apps.collaboration.models import Collaborator

from django.http import Http404
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict

js_fields = ['id', 'name', 'created_at']
annotated_fields = [ 'members_count', 'tasks_count']

def hydrate_team (team):
    data = model_to_dict(team, js_fields)
    for field in annotated_fields:
        data[field] = getattr(team, field)
    return data

@login_required
def team_list(request):
    user = request.user
    teams = None
    teams_ = []
    try :
        me = User.objects.get(id=user.id)
        # http://stackoverflow.com/questions/16636191/django-one-to-one-reverse-relationship-doesnotexist
        # http://stackoverflow.com/questions/19788908/onetoone-field-django
        # me 
        
        alreadyIds = []
        if me.teacher_teams.count () > 0 :
            teams = Team.objects.annotate(members_count=Count('members', distinct=True), tasks_count=Count('assigned_tasks', distinct=True)).filter(owner=me)
            #alreadyIds = [item.id for item in teams]
        for team in teams : 
            teams_.append(hydrate_team(team))
        user_id = me.id
        collaborations = Collaborator.objects.filter(Q(source=user_id) | Q(user=user_id)).distinct().all ()
        ids = [ item.id for item in collaborations  if item not in alreadyIds]
        
        myrelations_teams = Team.objects.annotate(members_count=Count('members', distinct=True), tasks_count=Count('assigned_tasks', distinct=True)).filter(id__in=ids).all()#.prefetch_related()
        """
        for key, value in dict.iteritems():
        temp = [key,value]
        dictlist.append(temp)"""
        for team in myrelations_teams :
            teams_.append(hydrate_team(team))
        return {'list' : teams_, "total" : len(teams_)}
    except Exception as e :
        return e
    raise Http404

@login_required
@require_POST
def create_team(request):
    user = request.user
    try :
        user = User.objects.get(id=user.id)
        from .forms import TeamForm
        form = TeamForm(request.POST)
        form.owner = user
        if form.is_valid():
            team = form.save(request)
            return   model_to_dict(team, fields=js_fields)
    except Exception:
        pass
    raise Http404


# get 
def get (request, _id):
    user = request.user
    try :
        user = User.objects.get(id=user.id)
        #FIXME , check for owner = me 
        try :
            team = Team.objects.get(id=_id, owner = user)
            return   model_to_dict(team, fields=js_fields)
        except Team.DoesNotExist:
            pass
    except User.DoesNotExist:
        pass
    raise Http404


# update 
@login_required
def update (request, _id):
    user = request.user
    # use select_for_update()
    try :
        me = User.objects.get(id=user.id)
        from .forms import TeamForm
        form = TeamForm(request.PUT)
        form.owner = me 
        if form.is_valid():
            #FIXME , check for user = creator 
            try :
                team = Team.objects.get(id=_id, creator = user)
                if team :
                    event = form.update (request, team)
                    return model_to_dict(event, fields=js_fields)
            except Team.DoesNotExist:
                pass
    except User.DoesNotExist:
        pass
    raise Http404


# delete 
@login_required
def delete (request, _id):
    user = request.user
    try :
        me = User.objects.get(id=user.id)
        try :
            team = Team.objects.get(id=_id, owner = user)
            team.delete()
        except Team.DoesNotExist:
            pass
    except Team.DoesNotExist:
        pass
    raise Http404


@login_required
@require_POST
def join_team(request, id):
    user = request.user
    try :
        me = User.objects.get(id=user.id)
        try : 
            coll_id = id or request.POST['member_id']
            collaborator = Collaborator.objects.get (id=coll_id)
            team_id =  request.POST['team_id']
            
            try : 
                team = Team.objects.get (owner=me, id=team_id)
                memberShip = None
                try : 
                    memberShip = TeamMemberShip.objects.get(team=team, member= collaborator)
                except TeamMemberShip.DoesNotExist :
                    memberShip = TeamMemberShip.objects.create(team=team, member= collaborator)                    
                return { 'status' : 200 , 'id' : memberShip.id, 'changed' : True}
            except Team.DoesNotExist:
                pass
        except Collaborator.DoesNotExist:
            pass
    except User.DoesNotExist:
        pass
    raise Http404


@login_required
@require_POST
def quit_team(request, id):
    user = request.user
    try :
        me = User.objects.get(id=user.id)
        try : 
            coll_id = id or request.POST['member_id']
            team_id =  request.POST['team_id']
            try : 
                team = Team.objects.get (owner=me, id=team_id)
                memberShip = None
                try : 
                    collaborator = Collaborator.objects.get (id=coll_id)
                    try : 
                        memberShip = TeamMemberShip.objects.get(team=team, member= collaborator)
                        memberShip.delete () 
                        return { 'status' : 200 , 'id' : memberShip.id, 'changed' : False}
                    except TeamMemberShip.DoesNotExist:
                        pass
                except Collaborator.DoesNotExist:
                    pass
            except Team.DoesNotExist:
                pass
        except Exception:
            pass
    except User.DoesNotExist:
        pass
    raise Http404
