define(['app'], function(App) {

    return {
        /**
         *
         */
        routes : {
            "chapter/:id/task"  : "chapterTasks",
            "chapter/task/:id" : "chapterTaskView",
        },
        // #fix Me
        prototype : {
            /**
             *
             * @param {Object} id
             */
            chapterTasks : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/collections/chapter/task'], function(TaskCollection) {
                        $.get(TaskCollection.prototype.url, {
                            cid : id
                        }, function(response) {
                            require(['scripts/main/views/chapter/task/list'], function(ListView) {
                                App.ChapterManager.updateRegion(new ListView({
                                    collection : new TaskCollection(response.list),
                                    chapterId :  id
                                }),'task');
                            });
                        });
                    });
                }, id);
            },
            /**
             *
             * @param {Object} id
             */
            collaboratioTaskView : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/views/chapter/task/view', 'scripts/main/models/chapter/task'], function(FormView, TaskModel) {
                        (new TaskModel({
                            id : id
                        })).fetch().done(function(response) {
                            var formView = new FormView({
                                model : new TaskModel(response)
                            });
                            App.CollaborationManager.mainRegion.show(formView);
                            App.CollaborationManager.updateMenu('tasks');
                        });
                    });
                }, id);
            },
        },
    };
});
