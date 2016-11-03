define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/tour/item.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.View.extend({
        el  : '',
        /**
         * 
         */
        events : {
            'click #next' : 'next',
            'click #prev' : 'previous'
        },
        /**
         * 
         */
        initialize : function() {
            this.template = _.template(template || "");
        },
        /**
         * 
         */
        previous : function() {
            this.collection.navigate(this.index, '1');
        },
        
        /**
         * 
         */
        next : function() {
            this.collection.navigate(this.previous, '1');
        },
        /**
         * 
         */
        render: function() {
           this.$el = $(this.template(this.model.toJSON()));
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
