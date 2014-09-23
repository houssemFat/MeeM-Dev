define(['jquery', 'underscore', 'backbone', 'app'], function($, _, Backbone, App) {
    var Manager = Backbone.View.extend({
        /**
         *
         */
        constructor : function(options, appName) {
            Backbone.View.apply(this, arguments);
            App.Manager = this;
            if (appName) {
                this.appName = appName ;
                App.Menu = new Menu(appName);
            }
            
        },
        /**
         * 
         */
        showRegion : function (view, href){
            console.log ('show region is deprecated, use updateRegion instead');
            this.updateRegion (view, href);
        },
        /**
         * 
         */
        updateRegion : function (view, href){
            this.mainRegion.show (view);
            this.updateMenu (href);
            App.router.after(this.appName);
        },
        /**
         * 
         * @param {Object} active
         */
        updateMenu : function (href) {
            this.menu.hilightActiveItem (href);
        },
        /**
         *
         */
        close : function() {
            this.remove();
        }
    });
    return Manager;
});

