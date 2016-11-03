define(['jquery', 
        'underscore', 
        'backbone', 
        'scripts/main/routes/course', 
        'scripts/main/routes/collaboration',
        'scripts/main/routes/inbox', 
        'scripts/main/routes/chapter', 
        'scripts/main/routes/profile', 
        'scripts/main/routes/settings', 
        'app'], 
function($, _, Backbone, CourseRoutes, CollaborationRoutes, InboxRoutes,   ChapterRoutes,  ProfileRoutes, SettingsRoutes, App) {
    var appRouter = Backbone.Router.extend({
        // initial routes
        routes : {
            ".*" : "dashBoard",
            "dashboard" : "dashBoard",
            "company/contact" : "contactCompany",

        },
        /**
         * Not found route function
         */
        notFound : function() {
            App.router.before();
            require(['scripts/common/views/404'], function(notFoundView) {
                App.mainRegion.show(new notFoundView({}));
            });
        },
        /**
         * Contact Comapny
         */
        contactCompany : function() {
            App.router.before();
            require(['scripts/common/views/company/contact'], function(FormView) {
                App.mainRegion.show(new FormView({}));
            });
        },
        /**
         * This function is called before the current route page is loaded
         */
        before : function() {
            if (App.mainRegion.$el) {
                common.Widget.overlay(App.mainRegion.$el);
            }
        },
        /**
         * This function is called after the current route page is loaded
         */
        after : function(tabId) {
            App.Menu.activeTab(tabId);
            if (App.mainRegion.$el) {
                common.Widget.unOverlay(App.mainRegion.$el);
            }
            common.Widget.hideEmptyModal();
        },
        /**
         *  dashBoard
         */
        dashBoard : function() {
            App.router.before();
            require(['scripts/main/views/dashboard/view', 'scripts/main/models/user'], function(DashBoardView, UserModel) {
                var model = new UserModel();
                model.fetch({
                    url : model.url ('dashboard'),
                    success : function(model, response) {
                        App.mainRegion.show(new DashBoardView({
                            model : model
                        }));
                        App.router.after('dashboard');
                    }
                });
            });
        }
    });
    // add external partial routes here  
    var externelRoutes = [
        // course route
        CourseRoutes, 
        // collaboration route
        CollaborationRoutes,  
        // inbox
        InboxRoutes,
        // chapter 
        ChapterRoutes,  
        // profile
        ProfileRoutes, 
        // settings 
        SettingsRoutes,  
    ];
    // run through out other routes
    externelRoutes.forEach(function(route) {
        _.extend(appRouter.prototype, route.prototype);
        _.extend(appRouter.prototype.routes, route.routes);
    });
    // redirect all other to not found 
    appRouter.prototype.routes['*whatever']  = "notFound" ;
    // finally return current application router 
    return appRouter;
});