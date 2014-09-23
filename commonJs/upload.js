/**
* upload.js v0.0.1 by fathallah houssem
* Copyright 2013 MeeM.
* MIT licence
*/
if (!jQuery) { throw new Error("uploadHelper requires jQuery") ;};
if (!window.common) { throw new Error("uploadHelper requires main common ") ;};
'use strict';

var defaultOptions = {
    firenow : false,
    remove : false,
    standalone : false,
};
/**
 * 
 */
common.fileUploader = function (container, fileId, sourceBtnId, options){
    /**
     * 
     */
    this.fileQuee_ = [];
    /**
     * 
     */
    this.filename = options ? ((options.filename) ? options.filename : 'file') : 'file' ;
    /**
     * 
     */
    this.$container_ = ((typeof (container) === "string") ? $('#' + container) : $(container));
    var content = this.$container_[0];
    /**
     * 
     */
    this.$sourceBtn_ = $('#' + sourceBtnId, content);
    /**
     * 
     */
    this.$file_ = (typeof fileId == 'string') ? $('#' + fileId, content) : $(fileId) ;
    if (this.$file_.length < 1 || (this.$file_[0].tagName !="FILE")){
        this.$file_ =  $('<input type="file"/>').hide().appendTo(this.$container_).attr('id', this.filename + '_' + common.getUid() );
    }
    /**
     * 
     */
    this.extensions_ = options ? (options.exts || []) : [];
    /**
     * 
     */
    this.$containerFiles_ = $('#files_container', content);
     /**
     * 
     */
    var actionUrl = options ? (options.url || '#') : '#';
    // url and with slash
    actionUrl +=  ((actionUrl.lastIndexOf('/') == actionUrl.length - 1 ) ? '' : '/' )  + 'upload/' ;
    this.actionUrl_ =  actionUrl ;
     /**
     * 
     */
    this.beforeFn_ = options ? (options.before ||  function (){return null;}) :  function (){return null;};
     /**
     * 
     */
    this.afterFn_ = options ? (options.success || function (){return null;}) :  function (){return null;};
     /**
     * 
     */
    this.cbScope_ = options ? (options.scope || function (){return null;}) :  function (){return null;};
    /**
     *  
     */
    var context = this ;
    /**
     *  
     */
    this.options = options ;
    /**
     * {upload, idle}
     */
    this.STATE = 'idle';
    /**
     * 
     */
    this.currentProgress =0 ;
    /**
     * 
     */
    this.handleFileSelect  = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.originalEvent.dataTransfer.files; // FileList object.
        context.push (files);
    };
    /**
     * 
     */
    this.push = function (files){
          // files is a FileList of File objects. List some properties.
        var output = [],
            accept ,
            states = 'certains files (%f) can\'t be uploaded, only %exts are accepted',
            reject = [] ;
        for (var i = 0, f; f = files[i]; i++) {
               accept =  this.buildFile (f);
               if (!accept){
                   reject.push(f.name);
               }
           };
       if (reject.length > 0){
           var string = states.replace('%exts', this.extensions_.join(', '));
           string = string.replace('%f', reject.join(', '));
           alert (string);
       }
       this.beforeFn_ ();
       this.startUpload ();
    };
    /**
     * 
     */
    this.buildFile = function (file) {
        var accept = common.checkExtension (file, this.extensions_);
            
        if (accept){
            var $progress = $('<li class="app-file-title-container"><strong class="app-file-title">' +  common.truncateString(escape(file.name), 40 , ' ..') + (!accept ? '<span class="app-file-not-accpeted"> <i class="fa-check fa" title="file not accepted"></i></span>' : '') + '</strong> </li>');
            var $percent = $('<div class="app-absolute app-progress"></div>').css ({'width' : '0%' });
                //$percentContainer = $('<div class="app-relative app-progress-container"></div>').append($percent);
            $percent.appendTo($progress);
            $progress.addClass('app-relative');
            this.fileQuee_.push({progress : $progress, file  : file});
            if (this.$containerFiles_.length)
                this.$containerFiles_.append ($progress);
        }
        return accept ;
    };
    /**
     * 
     */
    this.startUpload = function () {
        // start uploading 
       if (this.fileQuee_[this.currentProgress]){
           var file = this.fileQuee_[this.currentProgress].file;
            var     context = this;
            
            formData = new FormData();
            formData.append(this.filename, file);
            
            // extra 
            formData.append('extra', this.options.extra || {}/*$.param(params)*/);
            
            // data
           var data = this.options.data ; 
           if (data) {
                if (typeof (data) == 'function')
                    data = data.call (options.scope || this);
                for (key in data){
                    formData.append(key , data[key] );
                }
            }
            
            // call ajax
            $.ajax({
                    'type':'POST',
                    'data': formData,
                    'url' : this.actionUrl_  ,
                    'contentType': false,
                    'processData': false,
                    'dataType' : 'json',
                    'xhr': function() {  
                       var xhr = $.ajaxSettings.xhr();
                       if(xhr.upload){ 
                            xhr.upload.addEventListener('progress', 
                            function (response){
                                context.progressUpload (response);
                            }
                             , false);
                       }
                       return xhr;
                     },
                    'success': function(response){
                        if (context.afterFn_)
                            context.afterFn_.call(context.cbScope_ || this, response); // ...call the callback after each file upload.
                        context.startUpload ();
                    }
                  });
            this.currentProgressPercent_ = this.fileQuee_[this.currentProgress].progress;
            //context.progessFn (); //wait a bit to leave enough time for initial upload to be sent
        }
        if (this.fileQuee_.length > this.currentProgress)
            this.currentProgress ++ ;
            
    };
     //this function converts the JSON object of the progress into a visual progress bar      
      this.progessFn = function (){
            $.get(this.actionUrl_ + '/progress/',{}, $.proxy(context.progressUpload , context));
      };
     /**
     * 
     */
    this.progressUpload = function (response) {
        var $progress = this.currentProgressPercent_.find('.app-progress');
        /*if(response['bytes_processed']==undefined){
            $progress.css ({'width' : '100%' });
            //alert("Done!");
            //we do not make another request for the progress since it's done
         }
         else {
            //calculate the new pixel width of the progress bar
            var new_width = Math.round(response['bytes_processed'] / response['content_length'] * 600);
            $progress.css ({'width' : new_width + '%' });
         }*/
        var new_width = Math.round((response['position'] / response['loaded']) * 100);
        $progress.css ({'width' : new_width + '%' });
        
    };
    /**
     * 
     */
    this.handleDragOver = function (evt) {
        evt.preventDefault();
        evt.originalEvent.dataTransfer.dropEffect = 'upload your files here'; // Explicitly show this is a copy.
    };
    /**
     * 
     */
    this.$container_.bind ('dragover', this.handleDragOver).bind('drop', this.handleFileSelect);
    /**
     * 
     */
    this.$file_.change (function (ev){
        ev.preventDefault ();
        context.push (this.files);
    });
    // trigger onclick
   this.$sourceBtn_.click (function (ev){
        ev.preventDefault ();
        context.$file_.trigger('click');
    });
    
    this.fire =  function (){
        context.$file_.trigger('click');
    };
    return this;
};
