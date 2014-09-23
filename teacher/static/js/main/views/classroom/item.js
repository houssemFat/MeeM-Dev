define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/classroom/item.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.View.extend({
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #add" : "add",
        },
        className : '',
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
           this.model.view = this;
           return this;
        },
        /**
         * 
         */
        add : function (event){
            event.preventDefault();
            $.ajax ({
                    url : this.model.url () +  '/add' ,
                    data  : {id : this.model, },
                    type : 'post' ,
                    success : $.proxy (this.updateCollaborators, this, type)
                    }
               );
        },
        /**
         * 
         */
        updateCollaborators : function($button, type, response) {
            this.close;
         },
        /**
         * 
         */
        close : function() {
            this.remove ();
        },
  });
});
