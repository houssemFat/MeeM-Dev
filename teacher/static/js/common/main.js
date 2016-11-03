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
  'scripts/main/models/WebUser',
  'appLogin',
  'appRegister'
], function($, ui, bootstrap , _, Backbone,
            Router, App , WebUser, LoginView, RegisterView) {
  
  
  $.ajaxSetup({
    dataFilter: function(data, dataType) {
      if ('Login Required!' === data) {
        App.vent.trigger('alert', {
          msg: 'Login Required',
          type: 'error'
        });
        return ';';
      }
      return data;
    }
  });
  
  // Cross app collections
  // Load code defined on php side in main layout and start the Application.
  require(['onLoad'], function() {
        var router = new Router();
        App.addRegions({
            mainRegion: '#main_region',
            headRegion: '.head',
            userRegion: '#user_region'
          });
        App.router = router ;
        Backbone.history.start();
        App.start(); 
  });
  
  App.vent.on('webUser:init', function(data) {
    var model = data instanceof WebUser ? data : new WebUser(data);
    model.on('destroy',function() {
          view.close();
          App.vent.trigger('webUser:guest');
        });
    this.vent.on('logout', model.destroy, model);
  }, App);
  
  App.vent.on('webUser:guest', function(data) {
        if  (!App.LoginView){
            var login = new LoginView;
            login.render (); 
            App.LoginView = login;
        }
        App.LoginView.show (data);
  }, App);
  // browse 
  App.vent.on('Browse:Course', function(data) {
        if  (!App.RegisterView){
            var view = new RegisterView;
            view.render (data);
            App.RegisterView = view;
        }
        App.RegisterView.show (data);
  }, App);
  // welcome 
  App.vent.on('webUser:welcome', function(data) {
       require(['scripts/common/views/welcome'], function (WelcomeView) {
            new WelcomeView ();
      });
  }, App);
  
  // register 
  App.vent.on('webUser:new', function(data) {
        if  (!App.RegisterView){
            var view = new RegisterView;
            view.render (data);
            App.RegisterView = view;
        }
        App.RegisterView.show (data);
  }, App);
});