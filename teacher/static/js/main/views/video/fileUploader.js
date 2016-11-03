define(['jquery', 'underscore', 'backbone', 'app',  'commonUpload'], function($, _, Backbone, App, template, player) {
    return Backbone.View.extend({
        /**
         *
         */
        initialize : function(options) {
            var this_ = options.scope;
            // uplaod script
            new common.fileUploader(this_.$el, 'script_file', 'add_script', {
                exts : 'pdf txt doc docx'.split(' '),
                url : this_.model.url() + 'script/',
                success : this_.successScriptFn,
                progress : this_.progressScriptFn,
                scope : this_,
                data : this_.model.toJSON (),
                filename : 'script_file'
            });
            
            // uplaod documents
            new common.fileUploader(this_.$el, 'video_file', 'add_file', {
                exts : 'pdf txt doc docx'.split(' '),
                url : this_.model.url() + 'file/',
                success : this_.successFileFn,
                progress : this_.progressFileFn,
                scope : this_,
                data : this_.model.toJSON (),
                filename : 'course_document'
            });  
            this_.$el.find('#add_file, #add_script').removeAttr('disabled');
        },
    });
});
