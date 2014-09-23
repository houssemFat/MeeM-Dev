define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/professor/item.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.View.extend({
      /**
       * 
       */
        events: {
            
        },
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
           return this.$el;
        },
        /**
         * 
         * @param {Object} e
         */
        view : function(e){
            e.preventDefault();
            Backbone.history.navigate('professor/' + this.model.id, true);
        }
  });
});
