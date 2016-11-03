define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!scripts/main/templates/response/item.html',
  ], function($, _, Backbone, template)  {

  return Backbone.View.extend({
        /**
         * 
         */
        idAttribute : "label",
        /**
         * 
         */
        template : "",
        /**
         * 
         */
        events : {
            'click #state' : "toggle"
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
           return this;
        },
        /**
         * 
         */
        toggle : function (){
            var css = "question-response-check" ;
            if (this.model.get('value') === true){
                this.$el.find('#state').addClass(css + "-fail").removeClass(css + "-valid");
                this.model.set('value', false);
            }
            else {
                this.$el.find('#state').removeClass(css + "-fail").addClass(css + "-valid");
                this.model.set('value', true);
            }
        },
  });
});
