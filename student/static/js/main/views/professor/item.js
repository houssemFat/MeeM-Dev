define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/teacher/item.html',
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
            Backbone.history.navigate('teacher/' + this.model.id, true);
        }
  });
});
