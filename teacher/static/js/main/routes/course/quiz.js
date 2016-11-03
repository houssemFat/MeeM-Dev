define(['app'], function(App) {
   
    return   {
        /**
         * 
         */
        routes :  {
        // quiz
        "course/:id/quiz" : "courseQuizList",
        "course/:id/quiz/create" : "courseQuizCreate",
        "course/quiz/:id" : "courseQuizView",
        "course/quiz/:id/edit" : "quizUpdate",

        },
        // #fix Me
        prototype : {
            
            /**
             *
             * @param {Object} id
             */
            chapterQuizList : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/collections/quiz/quiz'], function(QuizCollection) {
                        $.get(QuizCollection.prototype.url, {
                            'cid' : id, 'module' : 'course'
                        }, function(response) {
                            require(['scripts/main/views/quiz/list'], function(ListView) {
                                var view = new ListView({
                                    collection : new QuizCollection(response.list),
                                    chapterId :  id
                                });
                                App.Manager.updateRegion(view, 'quiz');
                            });
                        });
                    });
                }, id);
            },
            
            // #TODO: do something if model wasn't found
            chapterQuizView : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/views/quiz/view', 
                            'scripts/main/models/quiz/quiz',
                            'scripts/main/collections/quiz/response',
                            
                            ], function(FormView, Model, ResponseCollection) {
                        var quiz = new Model({  id : id } );
                        quiz.fetch().done(function(response) {
                            var view = new FormView({
                                model : quiz, 
                                responses : new ResponseCollection (response.responses)
                            });
                            App.Manager.updateRegion(view, 'quiz');
                        });
                    });
                });

            },
            //
            chapterQuizCreate : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/views/quiz/form', 
                            'scripts/main/models/quiz/quiz',
                            'scripts/main/collections/quiz/response',],
                             function(FormView, Model, ResponseCollection)  {
                           var view = new FormView({
                                model : new Model({  course_id : id } ),
                                responses : new ResponseCollection ([])
                            });
                            App.Manager.updateRegion(view, 'quiz');
                    });
                }, id);

            },
            //
            quizUpdate : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/views/quiz/form', 
                            'scripts/main/models/quiz/quiz',
                            'scripts/main/collections/quiz/response',], 
                            function(FormView, Model, ResponseCollection) {
                        var quiz = new Model({  id : id } );
                        quiz.fetch().done(function(response) {
                            var view = new FormView({
                                model : quiz,
                                responses : new ResponseCollection (response.responses)
                            });
                            App.Manager.updateRegion(view, 'quiz');
                        });
                    });
                });
            },
        },
    };
});
