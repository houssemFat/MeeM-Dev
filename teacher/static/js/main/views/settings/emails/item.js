define([
  'jquery',
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/settings/emails/item.html',
  'jqueryUI',
  'common'
  ], function ($, _, Backbone, App, template) {
    var Question = Backbone.View.extend({
        /**
         * 
         */
        template : _.template(template || ""),
        /**
         * 
         */
        parentView : null ,
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
        modalView : null ,
        /**
         * 
         */
        events : { 
            'click #edit' : 'edit',
            'click #question_list' : 'QuestionsList',
        },
        /**
         * 
         */
        iconClass : 'app-t-question-position',
        /**
         * 
         */
        $icon : null,
        /**
         *
         */
        initialize : function(){
             this.$el.html(this.template(this.model.toJSON()));
        },
        /**
         * 
         * @param {Object} scope
         */
        activate :function (){
            this.$icon.addClass(this.iconClass + '-on').removeClass(this.iconClass + '-off');
        },
        /**
         * 
         */
        inactivate :function (){
           this.$icon.addClass(this.iconClass + '-off').removeClass(this.iconClass + '-on');
        },
        /**
         * 
         */
        updateTime : function (event){
            var percent = common.Widget.getPercentLeft (this.$el.parent ()[0], event);
            this.model.set ({ 'appear_at' : percent});  
        },
        /**
         * 
         */
        renderEvent : function (collectionView){
            this.parentView = collectionView ;
            this.$icon = this.$el.find ('.' + this.iconClass);
            var context = this ;
            this.$icon.draggable ({
                 axis: "x" , 
                 containment: collectionView.$insider,
                'drag' : $.proxy(context.updateTime, context)}
                );
            
        },
        /**
         * 
         * @param {Object} time
         */
        verify : function (time){
            var at = parseFloat(this.model.get('appear_at')) ;
            if (( at - 1) <= time )
            //if ((( at - 1) <= time ) && (time <= (at + 1)))
                this.activate ();
            else
                this.inactivate ();
        },
        /**
         * 
         * @param {Object} time
         */
        edit : function (e){
            e.preventDefault ();
            Backbone.history.navigate('chapter/quiz/'  + this.model.get('id') + '/edit', true);
        },
        
        /**
         * 
         * @param {Object} time
         */
        QuestionsList : function (e){
            e.preventDefault ();
            Backbone.history.navigate('chapter/quiz/'  + this.model.get('id') + '/items', true);
        },
    });
    return Question;
});