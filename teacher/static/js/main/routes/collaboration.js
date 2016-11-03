define(['jquery', 'underscore', 'backbone', 'app',
        'scripts/main/routes/collaboration/team',
        'scripts/main/routes/collaboration/member',
        'scripts/main/routes/collaboration/task',
        'scripts/main/routes/collaboration/invitation'], function($, _, Backbone, App, TeamRoutes, MemberRoutes, TaskRoutes,  InvitationRoutes) {
    var subroute = 'collaboration';
    var subroutes = {
        "*" : "collaborationView",
        "/members" : "collaborationView",
    };
    var routes = {};
    _.forEach(subroutes, function(value, key) {
        routes[subroute + key] = value;
    });
   var collaborationRoutes =  {
        routes : routes,
        prototype : {
            /**
             *
             */
            collaborationManager : function(callback, id) {
                App.router.before();
                if (!App.CollaborationManager) {
                    require(['scripts/main/views/collaboration/main'], function(CollaborationManager) {
                        App.mainRegion.show(new CollaborationManager(id));
                        callback();
                    });
                } else {
                    callback();
                }

            },
            /**
             *
             * @param {Object} id
             */
            collaborationView : function(id) {
                App.router.collaborationManager(function() {
                    require(['scripts/main/collections/collaboration/collaboration'], function(CollaborationCollection, TeamCollection) {
                        $.get(CollaborationCollection.prototype.url, {
                            cid : id
                        }, function(response) {
                            App.collaborators = new CollaborationCollection(response.list);
                            require(['scripts/main/views/collaboration/list'], function(Form) {
                                var view = new Form({
                                    collection : App.collaborators,
                                    teams : response.teams
                                });
                                 App.Manager.updateRegion(view, 'members');
                            });
                        });
                    });
                }, id);
            },
        },
    };
    var routes = [TeamRoutes, MemberRoutes, InvitationRoutes, TaskRoutes] ;
    for (index in routes){
        $.extend(collaborationRoutes.routes, routes[index].routes);
        $.extend(collaborationRoutes.prototype, routes[index].prototype);
    }
    return collaborationRoutes;
});
