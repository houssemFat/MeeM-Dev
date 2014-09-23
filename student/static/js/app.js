define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'jqueryUI',
  'jqueryEasing',
  'common',
  'commonWidget',
  'commonAutoc',
  'commonWArabic',
  'animbody',
], function($, _, Backbone, Marionette) {
      
      // initialize ap 
      var App ;
      // define the ajax errror
      $.ajaxSetup({
        dataFilter : function(data, dataType) {
          if ('Login Required!' === data) {
            App.vent.trigger('alert', {
              msg: 'Login Required',
              type: 'error'
            });
            return ';';
          }
          return data;
        },
        beforeSend : function (xhr) {
            xhr.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest');
            return xhr ;
        },
        statusCode: {
            401: function(){
                require (['app'], function (App){
                    App.vent.trigger('Error:loginRequired', {msg: 'Login Required', type: 'danger'});
                });
            }
        }
    });
    App  = new Backbone.Marionette.Application;
    // Emulation of json 
    Backbone.emulateJSON = true ;
    return App;
});