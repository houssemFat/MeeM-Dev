define(['app'], function(App) {
   
    return   {
        /**
         * 
         */
        routes :  {
        // quiz
        "chapter/:id/quiz" : "chapterQuizList",
        "chapter/:id/quiz/create" : "chapterQuizCreate",
        "chapter/quiz/:id" : "chapterQuizView",
        "chapter/quiz/:id/edit" : "quizUpdate",
        "chapter/quiz/:id/items" : "quizItems",

        },
        // #fix Me
        prototype : {
            
            /**
             *
             * @param {Object} id
             */
            chapterQuizList : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/collections/quiz/quiz'], function(QuizCollection) {
                        $.get(QuizCollection.prototype.url, {
                            cid : id, module : 'chapter'
                        }, function(response) {
                            require(['scripts/main/views/quiz/list'], function(ListView) {
                                App.ChapterManager.updateRegion(new ListView({
                                    collection : new QuizCollection(response.list),
                                    chapterId :  id
                                }), 'quiz');
                            });
                        });
                    });
                }, id);
            },
            
            // #TODO: do something if model wasn't found
            chapterQuizView : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/views/quiz/view', 
                            'scripts/main/models/quiz/quiz',
                            'scripts/main/collections/quiz/response',
                            
                            ], function(FormView, Model, ResponseCollection) {
                        var quiz = new Model({  id : id } );
                        quiz.fetch({ module : 'chapter'}).done(function(response) {
                            var formView = new FormView({
                                model : quiz, 
                                responses : new ResponseCollection (response.responses)
                            });
                            App.ChapterManager.updateRegion(formView, 'quiz');
                            App.ChapterManager.setChapterId (quiz.get('chapter_id'));
                        });
                    });
                });

            },
            //
            chapterQuizCreate : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/views/quiz/form', 
                            'scripts/main/models/quiz/quiz',
                            'scripts/main/collections/quiz/response',],
                             function(FormView, Model, ResponseCollection)  {
                           var formView = new FormView({
                                model : new Model({  chapter_id : id } ),
                                responses : new ResponseCollection ([])
                            });
                            App.ChapterManager.updateRegion(formView, 'quiz');
                    });
                }, id);

            },
            //
            quizUpdate : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/views/quiz/form', 
                            'scripts/main/models/quiz/quiz',], 
                            function(FormView, Model, ResponseCollection) {
                        var quiz = new Model({  id : id } );
                        quiz.fetch({data : { module : 'chapter'}}).done(function(response) {
                            var formView = new FormView({
                                model : quiz
                            });
                            App.ChapterManager.updateRegion(formView, 'quiz');
                            App.ChapterManager.setChapterId (quiz.get('chapter_id'));
                        });
                    });
                });

            },
            //
            quizItems : function(id) {
                App.router.chapterManager(function() {
                    require([
                            'scripts/main/models/quiz/quiz',
                            'scripts/main/views/quiz/question/list',
                            'scripts/main/collections/quiz/question',], 
                            function(QuizModel , ListView , QuestionCollection) {
                        var quiz = new QuizModel({  id : id } );
                        quiz.fetch({data : { module : 'chapter'}}).done(function(response) {
                            var collection  = new QuestionCollection (response.questions) ;
                            var view = new ListView({
                                model : quiz,
                                collection : collection 
                            });
                            App.ChapterManager.updateRegion(view, 'quiz');
                        });
                    });
                });

            },
        },
    };
});
