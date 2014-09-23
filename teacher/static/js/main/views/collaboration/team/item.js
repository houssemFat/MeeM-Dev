define([
  'jquery',
  'underscore',
  'backbone',
  'moment',
   'text!scripts/main/templates/collaboration/team/item.html',
  ], function($, _, Backbone, moment,
        template  ) {
  return Backbone.View.extend({
        template : _.template(template),
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
    });
});