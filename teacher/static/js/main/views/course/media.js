define([
  'jquery',
  'underscore',
  'backbone',
  'modelbinding',
  'scripts/main/models/course',
  'assests/views/media/media',
  'text!scripts/main/templates/course/media.html',
  'app',
  ], function($, _, Backbone, ModelBinding, CourseModel, MediaView, template, App) {

  return Backbone.View.extend({
    /**
     * 
     */
    template : _.template(template),
    /**
     * 
     */
    className : '',
    /**
     * 
     */
    events: {      
    },
    /**
     *  
     */
    initialize: function(options) {
        this.$el.html (this.template());
        new MediaView ({$el : this.$el, model : this.model}); 
    },  
    });
});
