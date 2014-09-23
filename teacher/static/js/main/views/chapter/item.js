define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/chapter/item.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.View.extend({
        events :{
            'click #view' : 'view',
            
        },
        el : '',
        /**
         * 
         */
        template : _.template(template || ""),
        /**
         * 
         */
        render: function() {
           this.$el.html(this.template(this.model.toJSON()));
           return this;
        },
        /**
         * 
         * @param {Object} e
         */
        view : function(e){
            e.preventDefault();
            Backbone.history.navigate('chapter/' + this.model.id, true);
        },
        close : function (){
            this.remove () ;
        }
  });
});
