define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/video/document/item.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.View.extend({
        /**
         * 
         */
        className : '',
        /**
         * 
         */
        initialize: function() {
             this.template = _.template(template || "");
        },
        /**
         * 
         */
        render: function() {
           this.$el.html(this.template(this.model.toJSON()));
           this.model.view = this;
           return this;
        },
        /**
         * 
         */
        close : function() {
            this.remove ();
        },
  });
});
