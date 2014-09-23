define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'text!scripts/main/templates/media/video.html',
  ], function($, _, Backbone, App, template) {

  return Backbone.View.extend({
    template : _.template(template),
    /**
     * 
     */
    className : '',
    /**
     * 
     * @param {Object} options
     */
    initialize: function(options) {
        this.$el.html(this.template({ upload_video_src : ''}));
        this.$el.appendTo('body');
        var context = this;
    },
    /**
     * 
     */
    select : function (){
        if (!this.$file){
            var   iframe = this.$el.children()[0],
                context = this ;
            $file = $('input[type=file]', iframe.contentWindow.document); 
            $file.change(function (event){context.change (event);}).attr({'multiple' : false});
            this.$file = $file ;
        }
        this.$file.click ();
    },
    /**
     * 
     */
    change : function (event){
        // check extension
        var file = this.$file[0];
        if (!common.checkExtension(file.files[0], ['flv', 'mp4', 'ogg', '3gp'])){
            alert ('Please choose a valid extension');
            return ;
        };
        this.$file.closest ('form').submit ();
    },
    /**
     * 
     */
    submit : function (){
        
    },
    close : function (){
        this.remove ();
    }
  });
});