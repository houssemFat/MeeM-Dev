define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/question/item.html',
  'text!scripts/main/templates/question/icon.html',
  'scripts/main/views/question/view',
  ], function($, _, Backbone, App, template, iconTemplate, QuestionView)  {

  return Backbone.View.extend({
        /**
         * 
         */
        waitingForResponse : false ,
        /**
         * 
         */
        template : "",
        /**
         * 
         */
        iconTemplate : "",
        /**
         * 
         */
        initialize: function() {
             this.template = _.template(template || "");
             this.iconTemplate = _.template(iconTemplate || "");
        },
        /**
         * 
         */
        iconClass : 'app-t-question-position',
        /**
         * 
         */
        render: function() {
           this.$el.html(this.template(this.model.toJSON()));
           this.$icon = $(this.iconTemplate (this.model.toJSON()));
           return this;
        },
        swtichPassed : function (){
            this.$icon.addClass(this.iconClass + '-on').removeClass(this.iconClass + '-off');
        },
        /**
         * 
         */
        activate : function (){
            // 
            if ((this.model.get('tried') < 2) && (!this.waitingForResponse)){
                __VP__.player.stop ();
                var view = new QuestionView ({model : this.model, tiggredBy : this});
                //view.render ();
                this.waitingForResponse = true ;
            }
            
            
        },
        /**
         * 
         */
        continue_ : function (){
           // this.waitingForResponse = false ;
            __VP__.player.continue_ ();
        },
        /**
         * 
         */
        inactivate :function (){
           this.$icon.addClass(this.iconClass + '-off').removeClass(this.iconClass + '-on');
        },
        /**
         * 
         * @param {Object} time
         */
        verify : function (time){
            var at = parseFloat(this.model.get('appear_at')) ;
            if ((( at - 1) <= time)){
                 this.swtichPassed ();
                 if (!this.waitingForResponse){
                     this.activate ();
                     return true ;
                 }
                return false ;
            }
            else{
                 this.inactivate ();
                 return false ;
            }
                
        },
  });
});
