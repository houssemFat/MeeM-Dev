define(['app'], function(App) {
   
    return   {
        /**
         * 
         */
        routes :  {
        // member
        "collaboration/:id/member" : "memberQuizList",
        "collaboration/:id/member/create" : "memberQuizCreate",
        "collaboration/member/:id" : "memberQuizView",
        "collaboration/member/:id/edit" : "memberUpdate",

        },
        // #fix Me
        prototype : {
            
            /**
             *
             * @param {Object} id
             */
            memberQuizList : function(id) {
                App.router.memberManager(function() {
                    require(['scripts/main/collections/member/member'], function(QuizCollection) {
                        $.get(QuizCollection.prototype.url, {
                            cid : id
                        }, function(response) {
                            require(['scripts/main/views/member/list'], function(ListView) {
                                App.ChapterManager.mainRegion.show(new ListView({
                                    collection : new QuizCollection(response.list),
                                    memberId :  id
                                }));
                                App.ChapterManager.updateMenu('member');
                            });
                        });
                    });
                }, id);
            },
            
            // #TODO: do something if model wasn't found
            memberQuizView : function(id) {
                App.router.memberManager(function() {
                    require(['scripts/main/views/member/view', 
                            'scripts/main/models/member/member',
                            'scripts/main/collections/member/response',
                            
                            ], function(FormView, Model, ResponseCollection) {
                        var member = new Model({  id : id } );
                        member.fetch().done(function(response) {
                            var formView = new FormView({
                                model : member, 
                                responses : new ResponseCollection (response.responses)
                            });
                            App.ChapterManager.mainRegion.show(formView);
                            App.ChapterManager.setChapterId (member.get('member_id'));
                            App.ChapterManager.updateMenu('member');
                        });
                    });
                });

            },
            //
            memberQuizCreate : function(id) {
                App.router.memberManager(function() {
                    require(['scripts/main/views/member/form', 
                            'scripts/main/models/member/member',
                            'scripts/main/collections/member/response',],
                             function(FormView, Model, ResponseCollection)  {
                           var formView = new FormView({
                                model : new Model({  member_id : id } ),
                                responses : new ResponseCollection ([])
                            });
                            App.ChapterManager.mainRegion.show(formView);
                            App.ChapterManager.updateMenu('member');
                    });
                }, id);

            },
            //
            memberUpdate : function(id) {
                App.router.memberManager(function() {
                    require(['scripts/main/views/member/form', 
                            'scripts/main/models/member/member',
                            'scripts/main/collections/member/response',], 
                            function(FormView, Model, ResponseCollection) {
                        var member = new Model({  id : id } );
                        member.fetch().done(function(response) {
                            var formView = new FormView({
                                model : member,
                                responses : new ResponseCollection (response.responses)
                            });
                            App.ChapterManager.mainRegion.show(formView);
                            App.ChapterManager.setChapterId (member.get('member_id'));
                            App.ChapterManager.updateMenu('member');
                        });
                    });
                });

            },
        },
    };
});
