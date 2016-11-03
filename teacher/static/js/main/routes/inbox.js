define(['jquery', 'underscore', 'backbone', 'app'], function($, _, Backbone, App) {
    var subroute = 'inbox';
    var subroutes = {
        "" : "inboxView",
        "/" : "inboxView",
        "/home" : "inboxView",
        "/compose" : "messageComposeView",
        "/sent" : "sentMessages",
        "/:id" : "messageItemView",
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
            inboxManager : function(callback, id) {
                App.router.before();
                if (!App.InboxManager) {
                    require(['scripts/main/views/inbox/main'], function(InboxManager) {
                        App.mainRegion.show(new InboxManager(id));
                        callback();
                        App.router.after('inbox');

                    });
                } else {
                    callback();
                    App.router.after('inbox');
                }

            },
            /**
             *
             */
            messageComposeView : function() {
                App.router.inboxManager(function() {
                    require(['scripts/main/views/inbox/form', 'scripts/main/models/message'], function(Form, MessageModel) {
                        App.InboxManager.inboxRegion.show(new Form({
                            model : new MessageModel()
                        }));
                        App.InboxManager.updateMenu('compose');
                    });
                });
            },
            /**
             *
             */
            messageItemView : function(id) {
                App.router.inboxManager(function() {
                    require(['scripts/main/views/inbox/view', 'scripts/main/models/message'], function(Form, MessageModel) {
                        (new MessageModel({
                            id : id
                        })).fetch({
                            success : function(response) {
                                App.InboxManager.inboxRegion.show(new Form({
                                    model : response
                                }));
                                App.InboxManager.updateMenu('home');
                            }
                        });
                    });
                }, id);
            },
            /**
             *
             */
            sentMessages : function(url) {
                this.inboxView('/sent', 'sent');
            },
            /**
             *
             * @param {Object} id
             */
            inboxView : function(url, menu) {
                App.router.inboxManager(function() {
                    require(['scripts/main/collections/inbox'], function(InboxCollection) {
                        var listUrl = InboxCollection.prototype.url + (url || '');
                        $.get(listUrl, { }, function(response) {
                            require(['scripts/main/views/inbox/list'], function(Form) {
                                var serverdata = $.extend(true, response, {
                                    url : listUrl
                                });
                                App.InboxManager.inboxRegion.show(new Form({
                                    collection : new InboxCollection(response.list)
                                }, serverdata));
                                App.InboxManager.updateMenu(menu || 'home');
                            });
                        });
                    });
                });
            },
        },
    };
});
