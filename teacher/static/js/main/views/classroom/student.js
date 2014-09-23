define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/classroom/student.html'
  ], function($, _, Backbone, App, template)  {

  return Backbone.View.extend({
      /**
         * 
         */
        initialize: function() {
            
        },
        /**
         * 
         */
        render: function() {
           this.$el.html(this.template(this.model.toJSON()));
           this.model.view = this;
           //this.$el.draggable ();
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
