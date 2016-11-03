define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/dashboard/history/item.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.View.extend({
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #view" : "view",
        },
        /**
         * 
         */
        tagName : 'li',
        /**
         * 
         */
        className : 'list-group-item',
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
        view : function (event){
            event.preventDefault();
            Backbone.history.navigate(this.model.get('model') + '/' + this.model.get('id'), true);
            
        },
        /**
         * 
         */
        close : function() {
            this.remove ();
        },
  });
});
