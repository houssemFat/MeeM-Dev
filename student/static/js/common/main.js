// Define -- jQuery as AMD module
define.amd.jQuery = true;
define([
  'jquery',
  'jqueryUI',
  'bootstrap',
  'underscore',
  'backbone',
  'scripts/common/router',
  'app',
  'scripts/main/models/student',
  'appLogin',
  'appRegister',
  'scripts/common/views/menu',
], function($, ui, bootstrap , _, Backbone,
            Router, App , User, LoginView, RegisterView, Menu) {
  
      /**
       * 
       */
      App.vent.on('User:IsAnonymousUser', function() {
            App.menu.close();
            var model = new User();
            require(['appLogin'], function(FormView) {
                new FormView({ model : model  });
            });
             require(['appRegister'], function(FormView) {
                new FormView({ model : model  });
            });
            //
            
            // Floating label headings for the contact form
            $(function() {
                $("body").on("input propertychange", ".floating-label-form-group", function(e) {
                    $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
                }).on("focus", ".floating-label-form-group", function() {
                    $(this).addClass("floating-label-form-group-with-focus");
                }).on("blur", ".floating-label-form-group", function() {
                    $(this).removeClass("floating-label-form-group-with-focus");
                });
            });
      }, App);
      /**
       * 
       */
      App.vent.on('User:IsLoggedIn', function(data) {
            App.menu.open();
      }, App);
      /**
       * 
       */
      App.vent.on('Error:loginRequired', function(data) {
            require (['appAlert'], function (View) {
               alertView = new View (data);
            });
      }, App);
      // Cross app collections
      // Load code defined on php side in main layout and start the Application.
      require(['onLoad'], function() {
        // start a new router
        var router = new Router();
        // add the main region
        App.addRegions({
            mainRegion: '#body_container',
        });
        // assign the app router
        App.router = router ;
        // assign the menu
        App.menu = new Menu();
        // start backbone history history
        Backbone.history.start();
        // start the app
        App.start ();
      });
});