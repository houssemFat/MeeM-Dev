define(['jquery', 'underscore', 'backbone', 'app', ], function($, _, Backbone, App) {

    return Backbone.View.extend({
        /**
         *
         */
        el : '#top_nav_menu',
        /**
         *
         */
        events : {
            'click #profile' : 'profile',
            'click #settings' : 'settings',
        },
        /**
         *
         */
        profile : function(event) {
            event.preventDefault();
            Backbone.history.navigate('profile', true);
        },
        /**
         *
         */
        settings : function($source) {
            event.preventDefault();
            Backbone.history.navigate('settings', true);
        },
    });
});
