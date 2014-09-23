import re
from django.views.decorators.http import require_GET
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import Http404

from core.apps.tools.common import dump_and_render_json

from core.apps.tools.common import models_to_dict
from core.apps.accounts.models import User 


@login_required
@require_GET
def quick_search(request):
    # get current user 
    try :
        user = User.objects.get(pk=request.user.id)
        my_collaborators = user.teacher.get_collaborators(True)
        users = [item.user for item in my_collaborators if re.search('\A'+ request.GET['q'] , item.user.username)]
        #users = User.objects.filter(Q(id__in=ids) & Q(username__statrwith=request.GET['q'])).all()
        return dump_and_render_json(request, models_to_dict(users, fields=["username", "id"]))
    except User.DoesNotExist , e:
        pass
    
    raise Http404 ()
