define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/chapter/item.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.View.extend({
        /**
         * 
         */
        template : _.template(template || ""),
        /**
         * 
         */
        events: {
            'click #open' : 'view',
        },
        /**
         * 
         */
        className : 'row col-lg-4',
        /**
         * 
         */
        initialize: function(options) {
            this.$el.html(this.template(this.model.toJSON()));
        },
        /**
         * 
         */
        view : function(options) {
             Backbone.history.navigate('/chapter/' + this.model.get('id'), true);
        },
        
        /**
         * 
         */
        close : function(options) {
           
        },
  });
});
