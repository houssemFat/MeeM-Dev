define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!scripts/main/templates/collaboration/invitation/sent_item.html',
  ], function($, _, Backbone, template)  {

  return Backbone.Marionette.ItemView.extend({
      events  : {
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
        decline : function (event){
            event.preventDefault ();
            $.post (this.model.url() + 'decline/', this.model.toJSON(), $.proxy(this.close,this));
        },
        /**
         * 
         */
        close : function() {
            this.remove ();
        },
  });
});
