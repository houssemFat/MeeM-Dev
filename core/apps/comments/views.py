import json

from django.http import HttpResponse

from django.views.decorators.http import require_POST, require_GET
from django.shortcuts import get_object_or_404, redirect

from django.contrib.auth.decorators import login_required
from django.contrib.contenttypes.models import ContentType

from core.apps.comments.authorization import load_can_delete, load_can_edit
from core.apps.comments.forms import CommentForm
from core.apps.comments.models import Comment
from core.apps.comments.signals import commented, comment_updated
from core.apps.tools.common import  render_json


can_delete = load_can_delete()
can_edit = load_can_edit()


def dehydrate_comment(comment):
    return {
        "pk": comment.pk,
        "comment": comment.comment,
        "author": {
                   'name' : comment.author.username,
                   'id' : comment.author.id,
                   },
        "name": comment.name,
        "email": comment.email,
        "website": comment.website,
        "submit_date": str(comment.submit_date)
    }


@require_POST
def post_comment(request, content_type_id, object_id, form_class=CommentForm):
    content_type = get_object_or_404(ContentType, pk=content_type_id)
    obj = get_object_or_404(content_type.model_class(), pk=object_id)
    form = form_class(request.POST, request=request, obj=obj, user=request.user)
    if form.is_valid():
        comment = form.save()
        commented.send(sender=post_comment, comment=comment, request=request)
        if request.is_ajax():
            created = dehydrate_comment(comment)
            return render_json(request, json.dumps(created, encoding="utf-8"))
    else:
        if request.is_ajax():
            return HttpResponse(json.dumps({
                "status": "ERROR",
                "errors": form.errors
            }), content_type="application/json")
    redirect_to = request.POST.get("next")
    # light security check -- make sure redirect_to isn't garbage.
    if not redirect_to or " " in redirect_to or redirect_to.startswith("http"):
        redirect_to = obj
    return redirect(redirect_to)


@require_GET
def comment_list(request, content_type_id, object_id):
    content_type = get_object_or_404(ContentType, pk=content_type_id)
    obj = get_object_or_404(content_type.model_class(), pk=object_id)
    comments = Comment.objects.filter(content_type=content_type, object_id=obj.pk)
    items = []
    for comment in comments :
        item = dehydrate_comment(comment)
        items.append(item)
    return render_json(request, json.dumps(items, encoding="utf-8"))


@login_required
@require_POST
def edit_comment(request, comment_id, form_class=CommentForm):
    comment = get_object_or_404(Comment, pk=comment_id)
    form = form_class(request.POST, instance=comment, request=request, obj=comment.content_object, user=request.user)
    if form.is_valid():
        comment = form.save()
        comment_updated.send(sender=edit_comment, comment=comment, request=request)
        if request.is_ajax():
            return HttpResponse(json.dumps({
                "status": "OK",
                "comment": dehydrate_comment(comment)
            }), content_type="application/json")
    else:
        if request.is_ajax():
            return HttpResponse(json.dumps({
                "status": "ERROR",
                "errors": form.errors
            }), content_type="application/json")
    redirect_to = request.POST.get("next")
    # light security check -- make sure redirect_to isn't garbage.
    if not redirect_to or " " in redirect_to or redirect_to.startswith("http"):
        redirect_to = comment.content_object
    return redirect(redirect_to)


@login_required
@require_POST
def delete_comment(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    obj = comment.content_object
    if can_delete(request.user, comment):
        comment.delete()
        if request.is_ajax():
            return HttpResponse(json.dumps({"status": "OK"}))
    else:
        if request.is_ajax():
            return HttpResponse(json.dumps({"status": "ERROR", "errors": "You do not have permission to delete this comment."}))
    return redirect(obj)
