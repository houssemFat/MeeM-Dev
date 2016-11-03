from django.conf.urls import url, patterns

urlpatterns = patterns(
    'core.apps.comments.views',
    url(r"^(?P<content_type_id>\d+)/(?P<object_id>\d+)/$", "post_comment",
        name="post_comment"),
    
    url(r"^(?P<content_type_id>\d+)/(?P<object_id>\d+)/list/$", "comment_list",
        name="comment_list"),
    url(r"^(?P<comment_id>\d+)/delete/$", "delete_comment",
        name="delete_comment"),
    url(r"^(?P<comment_id>\d+)/edit/$", "edit_comment",
        name="edit_comment")
)
