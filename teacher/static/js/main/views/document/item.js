define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/document/item.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.View.extend({
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "dblclick #filename" : "edit",
            "change #edit_filename" : "save",
            "blur #edit_filename" : "cancel",
            "change #download" : "download",
        },
        /**
         *
         */
        template : _.template(template),
        /**
         * 
         */
        initialize: function() {
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
        download : function (event){
            event.preventDefault();
            Backbone.history.navigate('document/' + this.model.get('id'), true);
            
        },
        /**
         * 
         */
        edit : function (event){
            this.$el.find("#filename").hide();
            this.$el.find("#edit_filename").select().show();
        },
        
        /**
         * 
         */
        cancel : function (event){
            this.$el.find("#edit_filename").hide();
            this.$el.find("#filename").show();
        },
        
        /**
         * 
         */
        save : function (event){
            var source = event.currentTarget ;
            source.value ;
        },
        /**
         * 
         */
        close : function() {
            this.remove ();
        },
  });
});
