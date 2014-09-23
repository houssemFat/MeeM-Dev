// Define -- jQuery as AMD module
define.amd.jQuery = true;
define([
  'jquery',
  'jqueryUI',
  'bootstrap',
  'underscore',
  'backbone',
  'scripts/main/router',
  'app',
  'scripts/main/models/student',
  'appLogin',
  'appRegister',
  'scripts/main/views/common/menu',
], function($, ui, bootstrap , _, Backbone,
            Router, App , User, LoginView, RegisterView, Menu) {
  
  /**
   * 
   */
  App.vent.on('User:IsLoggedIn', function(data) {
        App.menu = new Menu({model : new User (JSON.parse(data)) });
        var model = new User();
        App.isAuthenticated = true ;
        $('#body_container').css({'marginTop' : '80px'});
  }, App);
  /**
   * 
   */
  App.vent.on('Error:loginRequired', function(data) {
        require (['appAlert'], function (View) {
           alertView = new View (alertObject);
        });
  }, App);
  // Cross app collections
  // Load code defined on php side in main layout and start the Application.
  require(['onLoad'], function() {
        var router = new Router();
        App.addRegions({
            mainRegion: '#body_container',
          });
        App.router = router ;
        Backbone.history.start();
        App.start ();
    
  });
});