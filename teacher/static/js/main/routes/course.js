define(['jquery', 'underscore', 'backbone',  'app',
        'scripts/main/routes/course/document',
        'scripts/main/routes/course/classroom',
        'scripts/main/routes/course/syllabus',
        'scripts/main/routes/course/forum',], 
        function($, _, Backbone, App,  DocumentRoutes , ClassroomRoutes,  SyllabuesRoutes, ForumRoutes) {
    var subroute = 'course';
    var routes = {};
    var subroutes = {
        "" : "coursesList",
        "/list" : "coursesList",
        "/new" : "courseCreate",

        "/:id" : "courseView",
        "/:id/edit" : "courseEdit",
        "/:id/media" : "courseMedia",
        "/:id/docs" : "courseDocuments",
        "/:id/tools" : "courseTools",
        "/:id/tools/:name" : "courseTools",
        // forum
        "/:id/forum" : "courseForum",
        "/forum/compose" : "forumComposeView",
        "/forum/:id" : "forumItemView",
        "/forum/:id/edit" : "forumItemView",

        "/:id/goals" : "courseGoals",
        "/:id/stats" : "courseStats",
        
        //
        
        "/:id/chapters" : "chapterList",

    };
    _.forEach(subroutes, function(value, key) {
        routes[subroute + key] = value;
    });

    var courseRoutes =  {
        routes : routes,
        // #fix Me
        prototype : {

            /**
             *
             */
            courseManager : function(callback, id) {
                App.router.before();
                if (!App.CourseManager) {
                    require(['scripts/main/views/course/main'], function(CourseManager) {
                        App.mainRegion.show(new CourseManager(id));
                        callback();
                        App.router.after('course/list');
                    });
                } else {
                    callback();
                    App.router.after('course/list');
                }
            },
            /**
             *
             */
            coursesList : function() {
                App.router.before();
                App.courses.fetch().done(function() {
                    require(['scripts/main/views/course/list'], function(CourseList) {
                        App.mainRegion.show(new CourseList({
                            collection : App.courses
                        }));
                        App.router.after('course/list');
                    });
                });
            },
            /**
             *
             */
            courseEdit : function(id) {
                App.router.before();
                App.router.courseManager(function() {
                    require(['scripts/main/views/course/form', 'scripts/main/models/course'], function(Form, CourseModel) {
                        (new App.courses.model({
                            id : id
                        })).fetch().done(function(response) {
                            App.CourseManager.mainRegion.show(new Form({
                                model : new App.courses.model(response)
                            }));
                            App.CourseManager.updateMenu('edit');
                        });
                    });
                }, id);
            },
            
            /**
             *
             */
            courseView : function(id) {
                App.router.before();
                App.router.courseManager(function() {
                    require(['scripts/main/views/course/view', 'scripts/main/models/course'], function(Form, CourseModel) {
                        (new App.courses.model({
                            id : id
                        })).fetch().done(function(response) {
                            App.CourseManager.mainRegion.show(new Form({
                                model : new App.courses.model(response)
                            }));
                            App.CourseManager.updateMenu('edit');
                        });
                    });
                }, id);
            },
            /**
             *
             */
            courseMedia : function(id) {
                App.router.before();
                App.router.courseManager(function() {
                    require(['scripts/main/views/course/media', 'scripts/main/models/course'], function(MediaView, CourseModel) {
                        (new App.courses.model({
                            id : id
                        })).fetch().done(function(response) {
                            var formView = new MediaView({
                                model : new App.courses.model(response)
                            });
                            App.CourseManager.mainRegion.show(formView);
                            App.CourseManager.updateMenu('media');
                        });
                    });
                }, id);
            },
            /**
             *
             */
            courseGoals : function(id) {
                App.router.before();
                App.router.courseManager(function() {
                    require(['scripts/main/views/course/goals', 'scripts/main/models/course'], function(MediaView, CourseModel) {
                        (new App.courses.model({
                            id : id
                        })).fetch().done(function(response) {
                            var formView = new MediaView({
                                model : new App.courses.model(response)
                            });
                            App.Manager.updateRegion(formView, 'goals');
                        });
                    });
                }, id);
            },
            /**
             *
             */
            courseStats : function(id) {
                App.router.before();
                App.router.courseManager(function() {
                    require(['scripts/main/views/course/stats', 'scripts/main/models/course'], function(FormView, CourseModel) {
                        (new App.courses.model({
                            id : id
                        })).fetch().done(function(response) {
                            var formView = new FormView({
                                model : new App.courses.model(response)
                            });
                            App.CourseManager.mainRegion.show(formView);
                            App.CourseManager.updateMenu('stats');
                        });
                    });

                }, id);
            },
            /**
             *
             */
            courseCreate : function() {
                App.router.courseManager(function() {
                    require(['scripts/main/views/course/form'], function(Form) {
                        App.CourseManager.mainRegion.show(new Form({
                            model : new App.courses.model
                        }));
                    });
                });
            },
            /**
             *
             */
            // #TODO: do something if model wasn't found
            courseTools : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/views/tools/list'], function(toolsListView) {
                        App.CourseManager.mainRegion.show(new toolsListView({}));
                        App.CourseManager.updateMenu('classroom');
                    });
                }, id);
            },
            /**
             *
             */
            forumComposeView : function(id) {
                App.router.courseManager(function() {
                    
                    require(['scripts/main/views/forum/edit', 'scripts/main/models/forum'], function(Form, MessageModel) {
                        (new MessageModel({
                            id : id
                        })).fetch().done(function(response) {
                            App.CourseManager.mainRegion.show(new Form({
                                model : response
                            }));
                            App.CourseManager.updateMenu('forum');
                        });
                    });
                }, id);
            },
            /**
             *
             */
            forumItemView : function(id, forum_id) {
                App.router.courseManager(function() {
                    require(['scripts/main/views/forum/view', 'scripts/main/models/forum'], function(Form, MessageModel) {
                        (new MessageModel({
                            id : id
                        })).fetch({
                            success : function(response) {
                                App.CourseManager.mainRegion.show(new Form({
                                    model : response
                                }));
                                App.CourseManager.updateMenu('forum');
                            }
                        });
                    });
                }, id);
            },
            /**
             *
             * @param {Object} id
             */
            courseForum : function(id) {
                App.router.courseManager(function() {
                    common.loadCss('/ccss/bootstrap-wysihtml.css');
                    require(['scripts/main/collections/forum', 'scripts/main/views/forum/list'], function(collection, ForumList) {
                        $.get(collection.prototype.url(), {
                            cid : id
                        }, function(response) {
                            App.CourseManager.mainRegion.show(new Form({
                                    model : response.list
                                }));
                                App.CourseManager.updateMenu('forum');
                        });
                    });
                }, id);
            },
            /**
             *
             */
            chapterList : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/collections/chapter'], function(ChapterCollection) {
                        App.chapters = new ChapterCollection();
                        $.getJSON(App.chapters.url, {
                            cid : id
                        }, function(response) {
                            if (response.list.length )
                                App.chapters.add(response.list);
                            require(['scripts/main/views/chapter/list'], function(ChapterListView) {
                                App.CourseManager.mainRegion.show(
                                    new ChapterListView({
                                        collection : App.chapters,
                                        courseId : id
                                        }, response)
                                    );
                                App.CourseManager.updateMenu('chapters');
                            });
                        });
                    });

                }, id);
            },
        },
    };
    var routes = [DocumentRoutes, ClassroomRoutes, SyllabuesRoutes , ForumRoutes] ;
    for (index in routes){
        $.extend(courseRoutes.routes, routes[index].routes);
        $.extend(courseRoutes.prototype, routes[index].prototype);
    }
    return courseRoutes ;
});
