define([
  'jquery',
  'underscore',
  'backbone',
  'scripts/main/models/course',
  'text!scripts/main/templates/media/media.html',
  'app',
  'text!scripts/main/templates/media/video.html',
  'text!scripts/main/templates/media/camera.html',
  'text!scripts/main/templates/media/document.html',
  ], function($, _, Backbone, CourseModel, template, App) {

  return Backbone.View.extend({
    /**
     * 
     */
    template : _.template(template),
    /**
     * 
     */
    className : '',
    /**
     * 
     */
    events: {
        /*'click #take_snapshot' : 'snapShot',*/
        'click #upload_video_button' : 'uploadVideo',
        'change .third-party-link' : 'ThirdPartyLink',
    },
    /**
     * 
     * @param {Object} options
     */
     initialize: function(options) {
        this.$el = options.$el ;
        if (Modernizr.getusermedia){
          this.$el.find('#app_media_cam_info').hide ();
          this.$el.find('#app_media_cam_issues').show ();
          this.$el.find('#take_snapshot').attr('disabled','disabled');
        }
    },
    /**
     * 
     */
    render : function (){
        common.Widget.unOverlay (this.el[0]);
    },
    /**
     * 
     *
    snapShot : function () {
        var scope = this ;
        require(['scripts/main/views/media/camera'], function (CamView){
                   scope.CamView = 
                                new CamView ({model : scope.model});
                   scope.CamView.show ();
            });
    },
    /**
     * 
     */
    uploadVideo : function () {
        var scope = this ;
        require(['scripts/main/views/media/document'], function (DocumentView){
                   scope.DocumentView = 
                                new DocumentView ({model : scope.model});
                   scope.DocumentView.show ();
            });
    },
    /**
     * 
     */
    ThirdPartyLink : function (event) {
        var input  = event.currentTarget ;
        var provider = $(input).attr('link-for');
        switch (provider){
            case 'youtube': 
                return ;
            case 'vimeo': 
                return ;
            case 'dropbox': 
                return ;
        }
    },
    /***
     * 
     */
    enable : function (){
        this.$el.find('button').attr("disabled", false).removeClass('disabled');
    },
    /**
     * 
     */
    disable : function (){
        this.$el.find('button').attr("disabled", true).addClass('disabled');
    },
    /**
     * 
     */
    close: function() {
          this.undelegateEvents();
          this.remove();
    },
  });
});
