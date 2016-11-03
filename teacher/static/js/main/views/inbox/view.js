define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'text!scripts/main/templates/inbox/view.html',
  ], function($, _, Backbone, App, 
        template) {
  return Backbone.View.extend({    
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
    /*
      * 
      * @param {Object} event
      */
     close : function (event){
          this.remove ();
     }
  });
});
