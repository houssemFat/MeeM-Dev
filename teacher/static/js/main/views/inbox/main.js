define([
  'jquery',
  'underscore',
  'backbone',
  'modelbinding',
  'marionette',
  'scripts/main/views/inbox/menu',
  'text!scripts/main/templates/inbox/main.html',
  'app',
  ], function($, _, Backbone, ModelBinding, Marionette, CollaborationMenu, template, App) {
    /*
            */
  return Backbone.View.extend({
     /**
      * 
      */
    template : _.template(template),
    /**
     * @param {Object} options
     */
    courseRegion : null,
    /**
     * 
     * @param {Object} options
     */
    initialize: function(options) {
       this.inboxRegion = new Backbone.Marionette.Region({
            el: "#inbox_region_region"
        });
       this.$el.html(this.template());
       this.menu = new CollaborationMenu (this);
       App.InboxManager = this ;
       App.Menu.show();
    },
    /**
     * 
     * @param {String} active
     */
    updateMenu : function (href) {
        this.menu.hilightActiveItem (href);
    },
    /**
     * 
     */
    close : function (){
        App.InboxManager = null;
        this.remove ();
    }
  });
});
