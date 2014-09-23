define([
  'jquery',
  'underscore', 
  'backbone',
  'text!assests/templates/list/empty.html',
  ], function ($, _, Backbone, template) {
    return Backbone.Marionette.View.extend({
        /**
         * 
         */
        template : _.template(template || ""),
        /**
         * 
         */
        initialize : function (){
            this.$el.html(this.template());
        },
    });
});