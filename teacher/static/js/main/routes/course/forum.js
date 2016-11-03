define(['jquery', 'underscore', 'backbone', 'app'], function($, _, Backbone, App) {
    return {
        routes :  {
            // quiz
            "course/:id/forum" : "forumListView",
            "course/:id/forum/create" : "forumComposeView",
            "course/forum/:id" : "forumItemView",
        },
        prototype : {
            /**
             *
             */
            /**
             *
             * @param {Object} id
             */
            forumListView : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/collections/forum'], function(ForumCollection) {
                        $.get(ForumCollection.prototype.url, {
                            cid : id
                        }, function(response) {
                            require(['scripts/main/views/forum/list'], function(Form) {
                                App.Manager.updateRegion(new Form({
                                    collection : new ForumCollection(response.list)
                                }), 'forum');
                            });
                        });
                    });
                }, id);
            },
            forumComposeView : function() {
                App.router.courseManager(function() {
                    require(['scripts/main/views/forum/edit', 'scripts/main/models/forum'], function(Form, MessageModel) {

                        App.Manager.updateRegion(new Form({
                            model : new MessageModel({})
                        }), 'edit');
                    });
                });
            },
            /**
             *
             */
            forumItemView : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/views/forum/view', 'scripts/main/models/forum'], function(Form, MessageModel) {
                        (new MessageModel({
                            id : id
                        })).fetch({
                            success : function(response) {
                                App.Manager.updateRegion(new Form({
                                    model : response
                                }), 'edit');
                            }
                        });
                    });
                }, id);
            },
        },
    };
});
