# -*- coding: utf-8 -*-
from django.http import Http404

from core.apps.accounts.models import User
from django.forms.models import model_to_dict
from teacher.common import get_file_media_url


user_fields = ['name', 'lastname', 'username', 'email', 'id']
profile_fields = ['hobbies', 'skills', 'bio', 'facebook_link', 'twitter_link', 'google_plus_link']

def get_profile_infos(request):
    user = User.objects.get(id=request.user.id)
    data = model_to_dict(user, fields = user_fields)
    data.update(model_to_dict(user.profile, fields = profile_fields))
    data['cover'] = get_file_media_url(user.profile, 'cover')
    return data

def update_profile_infos(request, method):
    user = request.user
    try :
        user = User.objects.get(id=user.id)
        from .forms import ProfileInfosForm
        form = ProfileInfosForm(data=getattr(request, method))
        if form.is_valid():
            form.update_infos(request, user)
            return True
    except User.DoesNotExist as e:
        raise e
    raise Http404
     
def upload_cover (request):
    user = request.user
    try :
        user = User.objects.get(id=user.id)
        from .forms import CoverForm
        image = request.FILES['cover_file']
        form = CoverForm({}, request.FILES)
        if form.is_valid():
            profile = form.upload_cover(request,  user, image)
            return profile
        return form._errors
    except User.DoesNotExist as e:
        raise e
    raise Http404

