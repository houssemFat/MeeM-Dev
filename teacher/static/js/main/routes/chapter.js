define(['jquery', 'underscore', 'backbone', 'app', 'scripts/main/routes/chapter/video', 'scripts/main/routes/chapter/quiz', 'scripts/main/routes/chapter/document', 'scripts/main/routes/chapter/task'], function($, _, Backbone, App, VideoRoutes, QuizRoutes, DocumentRoutes, TaskRoutes) {
    var subroute = 'chapter';
    var routes = {};
    var subroutes = {
        "/:id" : "chapterView",
        "/:id/edit" : "chapterView",
        "/:id/new" : "chapterCreate",
        "/:id/chapters" : "chapterList",
        "/:id/media" : "chapterMedia",
        "/:id/document" : "chapterDocuments",
        "/:id/tools" : "chapterTools",
        "/:id/tools/:name" : "chapterTools",

        // forum
        "/:id/forum" : "chapterForum",
        "/forum/compose" : "forumComposeView",
        "/forum/:id" : "forumItemView",
        "/forum/:id/edit" : "forumItemView",

        // video
        "/:id/task" : "chapterTaskList",
        "/:id/task/create" : "chapterTaskCreate",
        "/task/:id" : "chapterTaskView",
        "/task/:id/edit" : "ItemView",

        "/:id/goals" : "chapterGoals",
        "/:id/stats" : "chapterStats",
        "/:id/classroom" : "chapterClassroom",
        "/:id/classroom/:sid" : "chapterClassroomStudentView",

    };
    _.forEach(subroutes, function(value, key) {
        routes[subroute + key] = value;
    });

    var chapterRoutes = {
        /**
         *
         */
        routes : routes,
        /**
         *
         */
        prototype : {

            /**
             *
             *//**
             *
             */
            chapterManager : function(callback, id) {
                App.router.before();
                if (!App.ChapterManager) {
                    require(['scripts/main/views/chapter/main'], function(ChapterManager) {
                        App.mainRegion.show(new ChapterManager(id));
                        callback();
                    });
                } else {
                    callback();
                }
            },
            // #TODO: do something if model wasn't found
            chapterEdit : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/views/chapter/form', 'scripts/main/models/chapter'], function(Form, ChapterModel) {
                        (new ChapterModel({
                            id : id
                        })).fetch().done(function(response) {
                            App.Manager.updateRegion(new Form({
                                model : new App.chapters.model(response)
                            }), 'edit');
                        });
                    });
                }, id);
            },
            /**
             *
             * @param {Object} id
             */
            chapterCreate : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/views/chapter/form', 'scripts/main/models/chapter'], function(Form, ChapterModel) {
                        App.Manager.updateRegion(new Form({
                            model : new ChapterModel({
                                course_id : id
                            })
                        }), 'edit');
                    });
                }, null);
            },
            // #TODO: do something if model wasn't found
            chapterView : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/views/chapter/view', 'scripts/main/models/chapter'], function(FormView, ChapterModel) {
                        (new ChapterModel({
                            id : id
                        })).fetch().done(function(response) {
                            var view = new FormView({
                                model : new ChapterModel(response)
                            });
                            App.Manager.updateRegion(view, 'edit');
                        });
                    });
                }, id);

            },
        },
    };
    var routes = [VideoRoutes, QuizRoutes, DocumentRoutes, TaskRoutes];
    for (index in routes) {
        $.extend(chapterRoutes.routes, routes[index].routes);
        $.extend(chapterRoutes.prototype, routes[index].prototype);
    }
    return chapterRoutes;
});
