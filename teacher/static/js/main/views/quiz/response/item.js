define([
  'jquery',
  'underscore', 
  'marionette',
  'app',
  'text!scripts/main/templates/quiz/response/item.html',
  'modelbinding',
  'jqueryUI'
  ], function ($, _, Marionette, App, template, ModelBinding) {
    return  Backbone.Marionette.ItemView.extend({
        /**
         * 
         */
        className : 'input-group input-group-option col-xs-12 quiz-response-item', //list-group-item
        /**
         * 
         */
        tagName : 'li',
        /**
         *
         */
        formBindings : {
            'change #response' : 'response',
            'change #is_true' : 'is_true',
        },
        /**
         * 
         */
        template : _.template(template || ""),
        /**
         * 
         */
        events : {
          'click #label' : 'editValue',
          'blur #text' : 'finishEdit',
          'click #toggle' : 'toggleIsTrue',
          'click #remove' : 'close',
        },
        /**
         * 
         */
        initialize : function  (options) {
            this.on ('item:rendered', this.onDomReady);
            this.$el.attr('id', 'order_' + String(this.model.get('order')) );
            this.model.view = this;
        },
        /**
         *  
         */
        updateOrder : function (order){
            this.model.set({'order' : order}, {silent : true});
            this.$el.attr('id', 'order_' + String(this.model.get('order')) );
        },
        /**
         *  
         */
        onDomReady : function (){
            this.$el.find('input').focus();
        },
        /**
         * 
         */
        render : function (){
            Backbone.Marionette.ItemView.prototype.render.apply(this, arguments);
            ModelBinding.bind(this);  
        },
        /**
         * 
         * @param {Object} e
         */
        toggleIsTrue : function (e){
            this.changeModelIsTrue ("toggle");
            e.preventDefault ();
            // $(e).stopImmediatePropagation();
            var isTrue = this.model.get('is_true');
            if (isTrue){
                this.model.collection.trigger('model:state:changed', this);
            };
        },
        /**
         * 
         */
        changeInputIsTrue : function (value){
            this.changeModelIsTrue (value);
        },
        /**
         * 
         */
        changeModelIsTrue : function (value){
            var $input = this.$el.find('#is_true');
            var $state = this.$el.find('#toggle');
            var input  = $input[0];
            if (value=="toggle"){
                input.checked = !input.checked ;
            }
            else {
                input.checked = value;
            }
            $input.change ();
            var isChecked = this.model.get('is_true');
            var trueAction = (isChecked ? 'add' : 'remove') + 'Class';
            var falseAction = (!isChecked ? 'add' : 'remove') + 'Class';
            $state[trueAction]('success');
            $state[falseAction]('default');
            
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
        },
        /**
         *
         */
        close : function() {
            this.model.destroy();
            this.remove();
        }
    });
});