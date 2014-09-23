define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/main/templates/course/view.html',
  'app',
  'scripts/main/views/chapter/list',
  'scripts/main/collections/chapter',
  'scripts/main/views/student/list',
  'scripts/main/collections/student',
  'scripts/main/views/professor/list',
  'scripts/main/collections/professor',
  ], function($, _, Backbone, template, App, 
      ChapterList, ChapterCollection, 
      StudentList, StudentCollection,
      ProfessorList, ProfessorCollection) {
  return Backbone.View.extend({
     /**
      * 
      */
    tagName : 'section',
    /**
     * 
     */
    initialize: function(options) {
         this.template = _.template(template || "");
    },
    /**
     * 
     */
    events: {
        
    },
    /**
     * 
     */
    render: function(options) {
       this.$el.html(this.template(this.model.toJSON()));
    },
    
    /**
     * 
     */
    renderChildren : function (){
        // render relative chapter for current course
        var chapters = this.model.get ('chapters');
        this.chapterList = new ChapterList ({collection : new ChapterCollection (chapters), $container : this.$el});
        // render relative professor for current course
        var professors = this.model.get ('professors');
        this.chapterList = new ChapterList ({collection : new ChapterCollection (chapters), $container : this.$el});
        // render relative followers for current course
        var students = this.model.get ('students');
        this.studentList = new StudentList ({collection : new StudentCollection (students), $container : this.$el});
        
        return this;
    },
    close : function (){
        this.remove ();
    }
  });
});
