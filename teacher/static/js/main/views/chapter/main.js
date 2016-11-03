define([
  'jquery',
  'underscore',
  'backbone',
  'modelbinding',
  'marionette',
  'manager',
  'app',
  'scripts/main/views/chapter/menu',
  'text!scripts/main/templates/chapter/main.html',
  ], function($, _, Backbone, ModelBinding, Marionette,  Manager, App, ChapterMenu, template) {
    /*
            */
  return Manager.extend({
      /**
       * 
       */
    appName : 'course/list',
     /**
      * 
      */
    template : _.template(template),
    /**
     * 
     */
    courseId : null,
    /**
     * 
     */
    chapterId : null,
    /**
     * 
     */
    $sectionTitle : null,
    /**
     * 
     */
    mainRegion : null,
    /**
     * 
     * @param {Object} options
     */
    initialize: function(id) {
       App.ChapterManager = this ;
       this.mainRegion = new Backbone.Marionette.Region({
            el : "#chapter_lab_region"
        });
       this.$el.html(this.template());
       this.$sectionTitle = this.$el.find ('#section_title');
       this.menu = new ChapterMenu ('chapter', this, !id);
       if (typeof (id) !== typeof (undefined))
            App.currentChapterId = id ;
        App.Menu.show();
    },
    /**
     */
    getChapterId : function() {
       return this.chapterId ;
    },    
    /**
     * 
     * @param {int} id
     */
    setChapterId : function(id) {
       this.chapterId = id;
       App.currentChapterId = this.getChapterId () ;
    },
    /**
     * 
     */
    getCourseId : function(id) {
       return this.courseId ;
    },
    /**
     * 
     * @param {Object} active
     */
    updateMenu : function (href) {
        this.menu.hilightActiveItem (href);
        this.$sectionTitle.html (href);
        this.menu.collapse (href);
    },
    /**
     * 
     */
    showQuizList : function (){
        Backbone.history.navigate('chapter/' + App.currentChapterId + '/quiz', true);
    },
    /**
     * 
     */
    close : function (){
        App.ChapterManager = null;
        this.remove ();
    }
  });
});
