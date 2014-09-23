define([
  'jquery',
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/quiz/question/item.html'
  ], function ($, _, Backbone, App, template) {
    return  Backbone.View.extend({
        /**
         * 
         */
        className : 'col-lg-12 app-drag app-t-suggestion-item',
        /**
         * 
         */
        tagName : 'li',
        /**
         * 
         */
        template : _.template(template || ""),
        /**
         * 
         */
        events : {
          'click #radioBtn a' : 'changeState',
          'click #label' : 'editValue',
          'blur #text' : 'finishEdit',
        },
        /**
         * 
         */
        initialize : function (){
            this.$el.html(this.template(this.model.toJSON()));
        },
        /**
         * 
         * @param {Object} e
         */
        changeState : function (e){
            var target = e.currentTarget ;
            var value = $(target).data('value');
            $('input#value', this.$el).prop('value', value);
            
            $('[data-value="'+ value +'"]', this.$el).removeClass('notActive').addClass('active');
            var nvalue = (value == 0 ) ? 1 : 0 ;
            $('[data-value="'+ nvalue +'"]', this.$el).removeClass('active').addClass('notActive');
        },
        /**
         * 
         * @param {Object} event
         * @param {Object} target
         * @param {Object} ui
        */
        editValue : function(event) {
           this.$el.find('#label').hide ();
           this.$el.find('#text').show ();
        },
        /**
         * 
         * @param {Object} event
        */
        finishEdit : function(event) {
           this.$el.find('#label').show ();
           this.$el.find('#text').hide ();
        }
    });
});