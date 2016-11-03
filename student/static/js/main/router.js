define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  ], function($, _, Backbone, App) {

  return Backbone.Router.extend({

    routes: {
      ""                : "courseList",
      "/"               : "index",
      "course/"          : "courseList",
      "course/:id"      : "courseView",
      "chapter/:id"     : "chapterView",
      "user/:id"        : "userView",
      "browse/"          : "browseCourses",
    },
    /**
     * 
     */
    index : function (){
       // App.vent.trigger('webUser:welcome');
        App.router.courseList ();
    },
    // Courses
    browseCourses : function() {
      require(['scripts/main/collections/course'], function(CourseCollection){
          if (!App.courses){
              App.courses = new CourseCollection (); 
          }
          App.courses.reset();           
          $.when(
            App.courses.length || App.courses.fetch({data : { type : 'all'}})
          ).done(function() {
            require(['scripts/main/views/course/list'], function(CourseList) {
            new CourseList({
                collection: App.courses
            });
            App.menu.updateActiveItem ('browse');
        });
          });
      });
    },
    // Courses
    courseList : function() {
      require(['scripts/main/collections/course'], function(CourseCollection){
          
          if (!App.courses)
            App.courses = new CourseCollection ();
          
          App.courses.reset();
          
          $.when(
            App.courses.length || App.courses.fetch( {  })
          ).done(function() {
            require(['scripts/main/views/course/list'], function(CourseList) {
            new CourseList({
                collection: App.courses
            });
            
            App.menu.updateActiveItem ('course');
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
          model.set({id:id});  // Set the id attribute of model
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
    /**
     * View the chapter in details
     * @param {int} id
     */
    chapterView : function(id) {
        require(['scripts/main/views/chapter/view', 'scripts/main/models/chapter'], function(FormView, ChapterModel) {
          var model = new ChapterModel();
          model.set({id:id});  
          model.fetch().done (function (data) {
                  var formView = new FormView({ model : model  });
                  App.mainRegion.show( formView );
                  formView.render();
                });
        });
    },
    /**
     * View the user in details
     * @param {int} id
     */
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
