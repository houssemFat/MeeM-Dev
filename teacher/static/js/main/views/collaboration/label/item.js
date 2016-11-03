define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/collaboration/task/label.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.Marionette.ItemView.extend({
      /**
       * 
       */
        template : _.template(template),
        /**
         * 
         */
        className : "app-scheduler-event-label",
        /**
         * 
         */
        events : {
            'click #label' :'select'
        },
        /**
         * 
         */
        initialize: function(options) {
           this.$el.html(this.template(this.model.toJSON()));
            _.bindAll(this, "select");
             
        },
        /**
         * 
         */
        select : function(e){
            this.model.collection.trigger('label:selected', this);
        },
        /**
         * 
         */
        close : function() {
            this.remove ();
        },
  });
});
