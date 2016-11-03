define([
  'jquery',
  'underscore',
  'backbone',
  'modelbinding',
  'marionette',
  'scripts/main/views/settings/menu',
  'text!scripts/main/templates/settings/main.html',
  'app',
  'manager'
  ], function($, _, Backbone, ModelBinding, Marionette, SettingsMenu, template, App, Manager) {
    /*
            */
  return Manager.extend({
     /**
      * 
      */
    template : _.template(template),
    /**
     * 
     * @param {Object} options
     */
    initialize : function(options) {
       App.SettingsManager = this ;
       this.mainRegion = new Backbone.Marionette.Region({
            el: "#settings_main_region"
        });
       this.$el.html(this.template());
       this.menu = new SettingsMenu ('collaboration', this);
       App.Menu.hide();
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
        App.SettingsManager = null;
        this.remove ();
    }
  });
});
