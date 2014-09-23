define([
  'jquery',
  'underscore', 
  'backbone',
  'text!assests/templates/comment/item.html',
  ], function ($, _, Backbone, template) {
    return Backbone.View.extend({
        /**
         * 
         */
        template : _.template(template || ""),
        /**
         * 
         *
        events : {
          'click #tag a' : 'changeState',
          'click #vote' : 'editValue',
          'blur #text' : 'finishEdit',
        },
        /**
         * 
         */
        initialize : function (){
            this.$el.html(this.template(this.model.toJSON()));
        },
    });
});