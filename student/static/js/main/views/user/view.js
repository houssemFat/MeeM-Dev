define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/main/templates/user/view.html',
  'app'
  ], function($, _, Backbone, template, App) {
  return Backbone.View.extend({    
    /**
     * 
     */
    initialize: function(options) {
         this.template = _.template(template || "");
    },
    render: function(options) {
      this.$el.html(this.template(this.model.toJSON()));
      
    }
  });
});
