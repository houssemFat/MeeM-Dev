define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!scripts/main/templates/collaboration/invitation/recieved_item.html',
  ], function($, _, Backbone, template)  {

  return Backbone.Marionette.ItemView.extend({
      events  : {
            'click #accept' : 'accept',
            'click #decline' : 'decline',  
        },
        /**
         * 
         */
        initialize: function() {
             this.template = _.template(template);
             
        },
        /**
         * 
         */
        accept : function (event){
            event.preventDefault ();
            $.post (this.model.url() + 'accept/',this.model.toJSON(), $.proxy(this.close,this));
        },
        
        /**
         * 
         */
        decline : function (event){
            event.preventDefault ();
            $.post (this.model.url('accept/' , 'coming') , this.model.toJSON(), $.proxy(this.close,this));
        },
        /**
         * 
         */
        close : function() {
            this.remove ();
        },
  });
});
