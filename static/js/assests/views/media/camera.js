navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;
define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/main/templates/media/camera.html',
  'app',
  ], function($, _, Backbone, template, App) {

  return Backbone.View.extend({
    template : _.template(template),
    /**
     * 
     */
    className : '',
    /**
     * 
     */
    events: {
        'click #play' : 'play',
        'click #stop' : 'stop',
        'click #upload' : 'stopRecording',
    },
    /**
     * 
     * @param {Object} options
     */
    initialize: function(options) {
        var html = this.template() ;
        this.$el = $(html);
        this.$el.appendTo('body');
    },
    Stram : null,
    /**
     * 
     */
    show : function (){
        var scope = this ;
        common.Widget.displayModal (this.$el, {close : function (){ scope.close ();}, fixed : true, scope : this});
        this.toggleEnable($('button#stop', this.$el), false);
        this.toggleEnable($('button#upload', this.$el), true);
    },
    /**
     * 
     */
    play : function (e){
        this.$el.css('width', '');
        e.preventDefault();
        this.toggleEnable(this.$el.find('#stop'), true);
        this.toggleEnable($(e.currentTarget), false);
        var scope = this ;
        if (!this.Stream){
            this.output = $('<video id="course_camera_video">').appendTo(scope.$el.find ('#camera_container'))[0];
            navigator.getUserMedia({audio: true, video: true}, function(stream) {
                var output = scope.output ,
                    source = window.URL.createObjectURL(stream),
                    $progress = $('#camera_progress', this.$el) ,
                    $progressBg = $('#camera_progress_bg', this.$el) ;
                 // console.log(stream);
                scope.Stream = {
                    stream : stream,
                    output : output,
                }; 
                output.autoplay = true;
                output.src = source;
                
                output.onprogress = function (){
                    if (output.currentTime <= 180){
                        var value = Math.min(
                                            (Number((output.currentTime / 180) * 100)).toFixed(5), 
                                        100) + '%';  
                         
                        $progressBg.css ('width', value);
                        $progress.css('left', value);
                    }
                    else {
                        scope.stop ();
                    }
                };
                
               
                //debug
                output.onloadstart = function (){
                   setTimeout(function (){
                       common.Widget.updatePosition ();
                    }, 100
                   );
                };    
                
                }, function(err) {
                    console.log(err);
                    err.code == 1 && (alert("You can click the button again anytime to enable."));
                }
            );
        }
        else {
            this.Stream.output.play(); //stream : stream,
            this.toggleEnable(this.$el.find('#play'), false);
            this.toggleEnable(this.$el.find('#stop'), true);
        }
    },
    /**
     * 
     */
    stop : function (e){
        this.Stream.output.pause(); //stream : stream,
        this.toggleEnable(this.$el.find('#play'), true);
        this.toggleEnable(this.$el.find('#stop'), false);
    },
    /**
     * 
     * @param {Object} $button
     * @param {Object} enable
     */
    toggleEnable : function  ($button, enable) {
      $button.attr ('disabled', !enable)[( enable ? 'remove' : 'add') + 'Class']('disabled');
    },
    /**
     * 
     */
    close : function (){
        this.stopRecording ();
        this.remove ();
    },
    /**
     * 
     */
    stopRecording : function () {
        if (this.Stream){
            this.Stream.stream.stop();
            this.Stream.stream.getRecordedData(postVideoToServer);    
        }
        
    },
    /**
     * 
 * @param {Object} videoblob
     */
    postVideoToServer : function (videoblob) {

        var data = {};
        data.video = videoblob;
        data.metadata = 'test metadata';
        data.action = "upload_video";
        $.post("http://www.kongraju.in/uploadvideo.php", data, onUploadSuccess);
    },
    onUploadSuccess : 
    function () {
        alert ('video uploaded');
    }
  });
});