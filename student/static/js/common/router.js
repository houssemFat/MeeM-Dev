define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  ], function($, _, Backbone, App) {

  return Backbone.Router.extend({

    routes: {
      ""                : "courseList",
      "course"          : "courseList",
      "course/:id"      : "courseView",
    },
    // Courses
    courseList : function() {
      require(['scripts/main/collections/course'], function(CourseCollection){
          if (!App.courses)
            App.courses = new CourseCollection ();
          $.when(
            App.courses.length || App.courses.fetch()
          ).done(function() {
            require(['scripts/main/views/course/list'], function(CourseList) {
            new CourseList({
                collection: App.courses
            });
        });
          });
      });
    },
    /**
     * View the course in details
     * @param {int} id
     */
    courseView : function(id) {
        require(['scripts/main/views/course/view', 'scripts/main/models/course'], function(FormView, CourseModel) {
          var model = new CourseModel();
          model.set({id:id});  // Set the id attribute of model to 15
          model.fetch({
              success : function (data) {
                  var formView = new FormView({ model : model  });
                  App.mainRegion.show( formView );
                  formView.render ();
                  formView.renderChildren ();
                }
            });
        });
    },
  });
});
