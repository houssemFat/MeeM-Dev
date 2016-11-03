define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/student/item.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.View.extend({
        // Delegated events for creating new items, and clearing completed ones.
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
            //App.router.navigate ('course/' + this.model.id);
            Backbone.history.navigate('student/' + this.model.id, true);
        }
  });
});
