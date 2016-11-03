# -*- coding: utf-8 -*-
from django.http import Http404

from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET

from core.apps.tools.common import render_json , MeeMJSONEncoder

import json

from . import helper
# get the list of incoming messages
@login_required
@require_GET
def default(request):
    data = helper.get_notifications_count(request)
    data = json.dumps(data, encoding="utf-8", cls=MeeMJSONEncoder)
    return render_json(request, data)

@login_required
@require_GET
def show(request):
    data = helper.get_notifications(request)
    data = json.dumps(data, encoding="utf-8", cls=MeeMJSONEncoder)
    return render_json(request, data)
# get the list of outcoming messages
