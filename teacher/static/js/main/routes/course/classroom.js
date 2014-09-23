define(['app'], function(App) {
   
    return   {
        /**
         * 
         */
        routes :  {
                
                "course/:id/classroom" : "courseClassroom",
                "course/:id/classroom/:sid" : "courseClassroomStudentView",
        },
        // #fix Me
        prototype : {
            
            /**
             *
             * @param {Object} id
             */
            courseClassroom : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/collections/classroom'], function(studentCollection) {
                        App.students = new studentCollection();
                        $.get(App.students.url, {
                            cid : id
                        }, function(response) {
                            var list = response.students || [];
                            App.students.add(list);
                            require(['scripts/main/views/classroom/list'], function(studentListView) {
                                App.CourseManager.mainRegion.show(new studentListView({
                                    collection : App.students,
                                    data : response.data,
                                    courseId : id
                                }));
                                App.CourseManager.updateMenu('classroom');
                            });
                        });
                    });

                }, id);
            },
            /**
             *
             */
            courseClassroomStudentView : function(id, studentId) {
                App.router.before();
                require(['scripts/main/views/classroom/view', 'scripts/main/models/student'], function(FormView, StudentModel) {
                    (new StudentModel({
                        id : id
                    })).fetch().done(function(response) {
                        var formView = new FormView({
                            model : new StudentModel(response)
                        });
                        App.mainRegion.show(formView);
                        App.router.after('classroom');
                    });
                });
            },
        },
    };
});