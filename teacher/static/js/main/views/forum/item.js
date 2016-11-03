define([
  'jquery',
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/forum/item.html',
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
        modalView : null ,
        /**
         * 
         */
        events : { 
            'click .app-t-question-position' : 'showQuestion',
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
            // save Collection View 
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
        showQuestion : function (e){
            e.preventDefault ();
            e.stopImmediatePropagation();
            __APP__.player.pause ();
            var context = this ;
            isNew = context.model.isNew ();
                    
            if (isNew){
                context.showModal ([], context.model);
            }
            else 
            Backbone.sync (
                               'read', 
                                context.model,
                                {
                                    data : {id : context.model.id},
                                    success : function (response) {
                                       context.showModal (response, context.model);
                                     }
                                }
                            );
                   /*
                    (new ({id: })).fetch().done ();
                   */
        },
        /**
         * 
         */
        showModal : function (collection, model){
             
            require(['scripts/main/views/question/view'], function(FormView) {
                var formView = new FormView({collection :  collection, model : model});
                });
        }
    });
    return Question;
});