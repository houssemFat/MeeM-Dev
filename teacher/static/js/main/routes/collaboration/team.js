define(['app'], function(App) {
   
    return   {
        /**
         * 
         */
        routes :  {
        // team
        "collaboration/teams" : "collaborationTeamList",
        "collaboration/teams/create" : "collaborationTeamCreate",
        "collaboration/teams/:id" : "collaborationTeamView",
        "collaboration/teams/:id/edit" : "collaborationTeamUpdate",
        },
        // #fix Me
        prototype : {
            
            /**
             *
             * @param {Object} id
             */
            collaborationTeamList : function(id) {
                App.router.collaborationManager(function() {
                    require(['scripts/main/collections/collaboration/team'], function(TeamCollection) {
                        $.get(TeamCollection.prototype.url, {
                            cid : id
                        }, function(response) {
                            require(['scripts/main/views/collaboration/team/list'], function(ListView) {
                                var view = new ListView({
                                    collection : new TeamCollection(response.list),
                                    memberId :  id
                                });
                                App.Manager.updateRegion(view, 'teams');
                            });
                        });
                    });
                }, id);
            },
            
            // #TODO: do something if model wasn't found
            collaborationTeamView : function(id) {
                App.router.collaborationManager(function() {
                    require(['scripts/main/views/team/view', 
                            'scripts/main/models/team/team',
                            
                            ], function(FormView, Model) {
                        var team = new Model({  id : id } );
                        team.fetch().done(function(response) {
                            var formView = new FormView({
                                model : team, 
                                responses : new ResponseCollection (response.responses)
                            });
                            App.Manager.updateRegion(formView, 'teams');
                        });
                    });
                });

            },
            //
            collaborationTeamCreate : function(id) {
                App.router.memberManager(function() {
                    require(['scripts/main/views/collaboration/team/form', 
                            'scripts/main/models/collaboration/team',
                            'scripts/main/collections/collaboration/team',],
                             function(FormView, Model, ResponseCollection)  {
                           var formView = new FormView({
                                model : new Model({  member_id : id } ),
                                responses : new ResponseCollection ([])
                            });
                            App.Manager.updateRegion(formView, 'teams');
                    });
                }, id);

            },
            //
            collaborationTeamUpdate : function(id) {
                App.router.memberManager(function() {
                    require(['scripts/main/views/team/form', 
                            'scripts/main/models/team/team',
                            'scripts/main/collections/team/response',], 
                            function(FormView, Model, ResponseCollection) {
                        var team = new Model({  id : id } );
                        team.fetch().done(function(response) {
                            var formView = new FormView({
                                model : team,
                                responses : new ResponseCollection (response.responses)
                            });
                            App.Manager.updateRegion(formView, 'teams');
                        });
                    });
                });

            },
        },
    };
});
