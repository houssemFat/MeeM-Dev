define(['jquery', 'underscore', 'backbone', 'app'], function($, _, Backbone, App) {
    var subroute = 'settings';
    var routes = {};
    var subroutes = {
        "" : "generalView",
        "/" : "generalView",
        "/password" : "passwordView",
        "/emails" : "emailsView",
        "/notifications" : "notificationsView",
        "/plan" : "planView",
        "/accounts" : "accountsView",

    };
    _.forEach(subroutes, function(value, key) {
        routes[subroute + key] = value;
    });

    return {
        /**
         *
         */
        routes : routes,
        /**
         *
         */
        prototype : {

            /**
             *
             *//**
             *
             */
            settingsManager : function(callback) {
                App.router.before();
                if (!App.SettingsManager) {
                    require(['scripts/main/views/settings/main'], function(SettingsManager) {
                        App.mainRegion.show(new SettingsManager());
                        callback();
                    });
                } else {
                    callback();
                }
            },
            //
            generalView : function(id) {
                App.router.settingsManager(function() {
                    require(['scripts/main/views/settings/general'], function(Form) {
                        App.Manager.updateRegion(new Form({
                            model : App.user
                        }), 'general');
                    });
                });
            },
            //
            passwordView : function(id) {
                App.router.settingsManager(function() {
                    require(['scripts/main/views/settings/password'], function(Form) {
                        App.Manager.updateRegion(new Form({
                            model : App.user
                        }), 'password');
                    });
                });
            },
            //
            emailsView : function(id) {
                App.router.settingsManager(function() {
                    require(['scripts/main/views/settings/emails'], function(Form) {
                        App.Manager.updateRegion(new Form({
                            model : App.user
                        }), 'emails');
                    });
                });
            },
            //
            notificationsView : function(id) {
                App.router.settingsManager(function() {
                    require(['scripts/main/views/settings/notifications'], function(Form) {
                        App.Manager.updateRegion(new Form({
                            model : App.user
                        }), 'notifications');
                    });
                });
            },
            //
            accountsView : function(id) {
                App.router.settingsManager(function() {
                    require(['scripts/main/views/settings/accounts'], function(Form) {
                        App.Manager.updateRegion(new Form({
                            model : App.user
                        }), 'accounts');
                    });
                });
            },
        },
    };
});
