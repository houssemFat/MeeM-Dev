define([
  'jquery',
  'underscore',
  'backbone',
  'modelbinding',
  'marionette',
  'manager',
  'app',
  'scripts/main/sideMenu',
  'text!scripts/main/templates/course/main.html',
  ], function($, _, Backbone, ModelBinding, Marionette, Manager, App, CourseMenu, template ) {
    /*
            */
  return Manager.extend({
    appName : 'course/list',
     /**
      * 
      */
    template : _.template(template),
    /**
     *  
     */
    navs : ['media', 'docs', 'syllabus', 'forum', 'classroom', 'stats', 'chapters'],
    /**
     * 
     */
    mainRegion : null,
    /**
     * 
     * @param {Object} options
     */
    initialize: function(id) {
       this.mainRegion = new Backbone.Marionette.Region({
            el: "#course_lab_region"
        });
       this.$el.html(this.template());
       
       this.menu = new CourseMenu ('course', this);
       App.CourseManager = this ;
       this.model = new Backbone.Model ({id : id});
       if (this.model.isNew ()){
            this.disableAllNavs ();
       }
       App.currentCourseId = id ;
       App.Menu.show();
    },
    /**
     * 
     * @param {Array} hrefList
     */
    disable : function (hrefList) {
        this.menu.disable (hrefList);
    },
    /**
     * 
     */
    disableAllNavs : function () {
        this.menu.disable (this.navs);
    },
    /**
     * 
     * @param {Object} active
     */
    updateMenu : function (href) {
        this.menu.hilightActiveItem (href);
    },
    /**
     * 
     */
    showQuizList : function (){
        Backbone.history.navigate('course/' + App.currentChapterId + '/quiz', true);
    },
    /**
     * 
     */
    close : function (){
        App.CourseManager = null;
        this.remove ();
    }
  });
});
