define([
  'jquery',
  'underscore',
  'backbone',
  'modelbinding',
  'marionette',
  'scripts/main/views/collaboration/menu',
  'text!scripts/main/templates/collaboration/main.html',
  'app',
  'manager'
  ], function($, _, Backbone, ModelBinding, Marionette, CollaborationMenu, template, App, Manager) {
    /*
            */
  return Manager.extend({
      /**
       * 
       */
    appName : 'collaboration',
     /**
      * 
      */
    template : _.template(template),
    /**
     * 
     * @param {Object} options
     */
    initialize : function(options) {
       App.CollaborationManager = this ;
       this.mainRegion = new Backbone.Marionette.Region({
            el: "#collaboration_region_region"
        });
       this.$el.html(this.template());
       this.menu = new CollaborationMenu ('collaboration', this);
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
        App.CollaborationManager = null;
        this.remove ();
    }
  });
});
