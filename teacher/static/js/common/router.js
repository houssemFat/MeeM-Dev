define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  ], function($, _, Backbone, App) {

  return Backbone.Router.extend({

    routes: {
      
      // Pages
      'default'         : 'index',
      
      ".*"              : "index",
      "course"          : "courseList",
      "course/:id"      : "courseView",
      "browse/"         : "browse",
      "user/:id"        : "userView",
      
    },
    index : function (){
       
    },
    browse : function (){
        require(['scripts/main/views/course/view', 'scripts/main/models/course'], function(FormView, CourseModel) {
          var model = new CourseModel();
          model.set({id:2});  // Set the id attribute of model to 15
          model.fetch({
              success : function (data) {
                  var formView = new FormView({ model : model  });
                  App.mainRegion.show(formView);
                  formView.renderChildern ();
                }
            });
        });
    },
    // Users
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
    // Todo: do something if model wasn't found
    courseView : function(id) {
        require(['scripts/main/views/course/view', 'scripts/main/models/course'], function(FormView, CourseModel) {
          var model = new CourseModel();
          model.set({id:id});  // Set the id attribute of model to 15
          model.fetch({
              success : function (data) {
                  var formView = new FormView({ model : model  });
                  App.mainRegion.show(formView);
                  formView.renderChildern ();
                }
            });
        });
    },
    // user view 
    // Todo: do something if model wasn't found
    userView : function(id) { 
        require(['scripts/main/views/user/view'], function(Form) {
          var model = App.courses.get(id);
          App.mainRegion.show(new Form({
            model : model
          }));
      });
    },
  });
});
