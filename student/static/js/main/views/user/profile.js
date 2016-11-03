define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/main/templates/user/profile.html',
  'app'
  ], function($, _, Backbone, template, App) {
  return Backbone.View.extend({    
    /**
     * 
     */
    initialize: function(options) {
         this.template = _.template(template || "");
    },
    /**
     * 
     * @param {Object} options
     */
    render: function(options) {
      this.$el.html(this.template(this.model.toJSON()));
      
    },
    close : function (){
        this.remove ();
    }
  });
});
