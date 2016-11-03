define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/main/templates/media/document.html',
  'app',
  'commonUpload'
  ], function($, _, Backbone, template, App) {

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
        var html = this.template() ,
            url = options.url || this.model.url ();
        this.$el = $(html);
        this.$el.appendTo('body');
        
        new common.fileUploader (
            $('#upload_file_container', this.$el)[0],
            'upload_file_source', 'upload_file_button', {exts : ['pdf', 'docx', 'doc'], url : url });
    },
    /**
     * 
     */
    show : function (){
        var scope = this ;
        common.Widget.displayModal (this.$el, {close : function (){ scope.close ();}, fixed : true});
        
    },
    close : function (){
        this.remove ();
    }
  });
});