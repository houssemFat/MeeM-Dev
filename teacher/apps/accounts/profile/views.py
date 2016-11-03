from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods, require_POST
from django.http import  HttpResponseRedirect
from django.utils  import translation
from django.conf import settings
from django.http import JsonResponse

from teacher.common import render, get_file_media_url
from core.apps.tools.common import MeeMJSONEncoder

from . import  helper

@login_required
@require_http_methods(['GET', 'POST', 'PUT'])
def profile(request, initial_email=None):
    data = None
    if request.method == 'GET':
        data = helper.get_profile_infos (request)
    elif (request.method == 'POST' or request.method == 'PUT'):
        data = helper.update_profile_infos (request, request.method)
    # FIXME verfiy profile session page expires
    if request.is_ajax():
        return JsonResponse (data, encoder=MeeMJSONEncoder, safe=False)
    return render(request, 'tprofile/profile.html')


@require_POST
@login_required
# upload file 
def upload_cover(request):
    profile = helper.upload_cover(request)
    return JsonResponse ({'cover' : get_file_media_url(profile, 'cover')})

@login_required
def update_lang(request):
    if request.user.is_authenticated():
        profile = request.user.userprofile
        lang_code =  request.POST['language']
        profile.lang = lang_code
        profile.save()
    if lang_code and translation.check_for_language(lang_code):
        if hasattr(request, 'session'):
            request.session['django_language'] = lang_code
        else:
            request.set_cookie(settings.LANGUAGE_COOKIE_NAME, lang_code)
        return HttpResponseRedirect ("teacher/account/profile")
    return HttpResponseRedirect ("/")

