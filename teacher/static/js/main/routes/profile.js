define(['jquery', 'underscore', 'backbone', 'app'], function($, _, Backbone, App) {
    var subroute = 'profile';
    var routes = {};
    var subroutes = {
        "" : "profileView",

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
            //
            profileView : function(id) {
                require(['scripts/main/views/profile/main', 'scripts/main/models/user'], function(PofileManager, UserModel) {
                    var model = new UserModel();
                    model.fetch({
                        url : model.url('accounts/profile/'),
                        success : function() {
                            App.mainRegion.show(new PofileManager({model : model}));;
                        }
                    });
                });
            },
        },
    };
});
