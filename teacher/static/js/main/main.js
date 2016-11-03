// Define jQuery as AMD module
define.amd.jQuery = true;
define([ 'jquery',  'jqueryUI',  'bootstrap',  'underscore',  'backbone',  'scripts/main/router',  'scripts/main/collections/course',  'scripts/main/menu', 'scripts/main/topNavMenu' ,  'app', 'scripts/main/views/notification/main'], function($, ui, bootstrap , _, Backbone,
            Router,  CourseCollection, Menu, TopNavMenu, App, Notifier) {
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
      // Initialize search
      App.addInitializer(function (options) {
            /*Backbone.Marionette.Region.prototype.open = function(view){   
                this.$el.hide();   
                this.$el.html(view.el);   
                this.$el.show(); 
            };*/
        });
        /**
         * 
         */
       App.vent.on('User:IsLoggedIn', function(data) {
            var jdata = $.parseJSON (data);
            App.username = jdata.username ;
            
      }, App);
      // Cross app collections
      App.courses    = new CourseCollection;
    // Load code defined on php side in main layout and start the Application.
    require(['onLoad'], function(data) {
           var Notification = 0;
           App.addRegions({
                mainRegion : '#main_region',
              });
            var router = new Router();
            var route = __CONFIG__.baseUrl + 'teacher' ;
            $('#start_toor').click (function (){
                var scope = this;
                $('#guide').joyride({'tipContent' : '#guide', 
                'postRideCallback' : function ($current){
                    $(scope).removeAttr('disabled');
                    $current.removeClass('guider-on');
                    $('.joyride-tip-guide').remove();
                },
                'postStepCallback' : function (index, $current, $previous){
                    $current.addClass('guider-on');
                    if ($previous){
                        $previous.removeClass('guider-on');
                    }
                }
                });
                $(this).removeClass('animate-start-guide');
                $(this).attr('disabled','disabled');
                
            });
            App.router = router ;
            //Backbone.history.start({pushState: true, root : route + '/'});
            //alert (route);
            
            Backbone.history.start();
            App.Menu = new Menu ();
            App.TopNavMenu = new TopNavMenu ();
            App.notifier = new Notifier () ;
            setTimeout(function (){
                App.notifier.notify ();
            }, 1500);
            //
            App.User = undefined;
            if (__CONFIG__.user)
                App.User = JSON.parse(__CONFIG__.user) ;
            
            App.start();
      });
   
});