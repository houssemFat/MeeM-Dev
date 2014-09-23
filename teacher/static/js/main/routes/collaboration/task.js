define(['app'], function(App) {

    return {
        /**
         *
         */
        routes : {
            "collaboration/tasks" : "collaborationTasks",
            "collaboration/task/:id" : "collaborationTaskView",
        },
        // #fix Me
        prototype : {
            /**
             *
             * @param {Object} id
             */
            collaborationTasks : function(id) {
                App.router.before();
                App.router.collaborationManager(function() {
                    require(['scripts/main/views/collaboration/task/list', 'scripts/main/collections/collaboration/task', 'scripts/main/collections/collaboration/collaboration', 'scripts/main/collections/collaboration/team'], function(SchedulerView, TaskCollection, CollaborationCollection, TeamCollection) {
                        var tasks = null;
                        var bindView = function() {
                            var view = new SchedulerView({
                                collection : tasks,
                                collaborators : App.collaborators,
                                teams : App.collaboratorsTeams,

                            });
                            App.Manager.updateRegion(view, 'tasks');
                        };
                        $.get(CollaborationCollection.prototype.url, {
                            cid : id
                        }, function(response) {
                            App.collaborators = new CollaborationCollection(response.list);
                            App.collaboratorsTeams = new TeamCollection(response.teams);
                            $.get(TaskCollection.prototype.url, {}, function(response) {
                                tasks = new TaskCollection(response.list);
                                bindView();
                            });
                        });
                    });
                }, id);
            },
            /**
             *
             * @param {Object} id
             */
            collaborationTaskView : function(id) {
                App.router.before();
                App.router.collaborationManager(function() {
                    require(['scripts/main/views/collaboration/task/view', 'scripts/main/models/collaboration/task'], function(FormView, TaskModel) {
                        (new TaskModel({
                            id : id
                        })).fetch().done(function(response) {
                            var formView = new FormView({
                                model : new TaskModel(response)
                            });
                            App.Manager.updateRegion(formView, 'tasks');
                        });
                    });
                }, id);
            },
        },
    };
});
