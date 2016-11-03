define(['app'], function(App) {
   
    return   {
        /**
         * 
         */
        routes :  {
        // syllabus
        "course/:id/syllabus" : "courseSyllabusList",
        "course/:id/syllabus/create" : "courseSyllabusCreate",
        "course/syllabus/:id" : "courseSyllabusView",
        "course/syllabus/:id/edit" : "syllabusUpdate",

        },
        // #fix Me
        prototype : {
            
            /**
             *
             * @param {Object} id
             */
            courseSyllabusList : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/collections/course/syllabus'], function(SyllabusCollection) {
                        $.get(SyllabusCollection.prototype.url, {
                            cid : id
                        }, function(response) {
                            require(['scripts/main/views/course/syllabus/list'], function(ListView) {
                                var view = new ListView({
                                    collection : new SyllabusCollection(response.list),
                                    model : new Backbone.Model ({courseId :  id})
                                });
                                App.Manager.updateRegion(view, 'syllabus');
                            });
                        });
                    });
                }, id);
            },
            
            // #TODO: do something if model wasn't found
            courseSyllabusView : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/views/course/syllabus/view', 
                            'scripts/main/models/course/syllabus',
                            ], function(FormView, Model) {
                        var syllabus = new Model({  id : id } );
                        syllabus.fetch().done(function(response) {
                            var view = new FormView({
                                model : syllabus
                            });
                            App.Manager.updateRegion(view, 'syllabus');
                        });
                    });
                }, id);

            },
            //
            courseSyllabusCreate : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/views/syllabus/form', 
                            'scripts/main/models/syllabus/syllabus',
                            'scripts/main/collections/syllabus/response',],
                             function(FormView, Model, ResponseCollection)  {
                           var view = new FormView({
                                model : new Model({  course_id : id } ),
                                responses : new ResponseCollection ([])
                            });
                            App.Manager.updateRegion(view, 'syllabus');
                    });
                }, id);

            },
            //
            syllabusUpdate : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/views/syllabus/form', 
                            'scripts/main/models/course/syllabus',
                            'scripts/main/collections/syllabus/response',], 
                            function(FormView, Model, ResponseCollection) {
                        var syllabus = new Model({  id : id } );
                        syllabus.fetch().done(function(response) {
                            var view = new FormView({
                                model : syllabus,
                                responses : new ResponseCollection (response.responses)
                            });
                            App.Manager.updateRegion(view, 'syllabus');
                        });
                    });
                });

            },
        },
    };
});
