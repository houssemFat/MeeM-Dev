define([
  'jquery',
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/chapter/task/item.html'
  ], function ($, _, Backbone, App, template) {
    var Question = Backbone.View.extend({
        /**
         * 
         */
        template : _.template(template || ""),
        /**
         * 
         */
        events : { 
            'click .app-t-question-position' : 'showQuestion',
        },
        /**
         *
         */
        initialize : function(){
             this.$el.html(this.template(this.model.toJSON()));
        },
    });
    return Question;
});