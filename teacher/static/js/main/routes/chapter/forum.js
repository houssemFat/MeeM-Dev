define(['jquery', 'underscore', 'backbone', 'app'], function($, _, Backbone, App) {
    var subroute = 'chapter';
    var subroutes = {
        "/:id/" : "ChapterForumList",
        "/:id/compose" : "ChapterForumCompose",
        "/forum/:id" : "ChapterForumView",
    };
    var routes = {};
    _.forEach(subroutes, function(value, key) {
        routes[subroute + key] = value;
    });
    return {
        routes : routes,
        prototype : {
            /**
             *
             */
            ChapterForumCompose : function(id) {
                App.router.forumManager(function() {
                    require(['scripts/main/views/forum/edit', 'scripts/main/models/forum'], function(Form, ForumModel) {
                        App.InboxManager.forumRegion.show(new Form({
                            model : new ForumModel({
                                chapter_id : id
                            })
                        }));
                        App.InboxManager.updateMenu('edit');
                    });
                });
            },
            /**
             *
             */
            ChapterForumView : function(id) {
                App.router.forumManager(function() {
                    require(['scripts/main/views/forum/view', 'scripts/main/models/forum'], function(Form, ForumModel) {
                        (new ForumModel({
                            id : id
                        })).fetch({
                            success : function(response) {
                                App.Manager.updateRegion(new Form({
                                    model : response
                                }), 'forum');
                            }
                        });
                    });
                }, id);
            },
            /**
             *
             * @param {Object} id
             */
            ChapterForumList : function(id) {
                App.router.forumManager(function() {
                    require(['scripts/main/collections/forum'], function(InboxCollection) {
                        $.get(InboxCollection.prototype.url, {
                            cid : id,
                            module : 'chapter'
                        }, function(response) {
                            require(['scripts/main/views/forum/list'], function(Form) {
                                App.Manager.updateRegion(new Form({
                                    collection : new InboxCollection(response.list)
                                }), 'forum');
                            });
                        });
                    });
                }, id);
            },
        },
    };
});
