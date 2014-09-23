define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/course/item.html',
  'text!scripts/main/templates/course/request.html',
  'appModal',
  ], function($, _, Backbone, App, template, requestTemplate, ModalConfirmView)  {

  return Backbone.View.extend({
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'click .caption' : 'view',
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
            Backbone.history.navigate('course/' + this.model.id, true);
        }
  });
});
