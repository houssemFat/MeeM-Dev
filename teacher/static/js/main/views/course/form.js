define(['jquery', 'underscore', 'backbone', 'modelbinding', 
    'scripts/main/models/course',
     'text!scripts/main/templates/course/form.html',
     'text!assests/templates/editor/image_upload.html', 
    'app', 'editor', 'datePicker', 'commonUpload'], function($, _, Backbone, ModelBinding, CourseModel, template, image, App, Editor) {

    return Backbone.View.extend({
        /**
         *
         */
        template : _.template(template),
        /**
         *
         */
        initialize : function(options) {
            _.bindAll(this, 'render', 'close', 'success', 'error');
            this.model.on('sync', this.success);
            this.model.on('error', this.error);
            this.model.on('change', this.change);
        },
        /**
         *
         */
        formBindings : {
            'change #title' : 'title',
            'change #about' : 'about',
            /*
             * FIXME manually change this
             *
            'change #start_at' : 'start_at',
            'change #end_at' : 'end_at',*/
            'change #facebook_link' : 'facebook_link',
            'change #twitter_link' : 'twitter_link',
            'change #google_plus_link' : 'google_plus_link',
        },
        className : '',
        /**
         *
         */
        events : {
            'click button[name=save]' : 'save',
        },
        /**
         *
         */
        editorImageCallback : null,
        /**
         *
         */
        imageUploader : null,
        starDate : null,
        endDate : null,
        /**
         *
         */
        render : function() {
            common.loadCss('/ccss/bootstrap-wysihtml.css');
            this.$el.html(this.template(this.model.toJSONDisplay()));
            ModelBinding.bind(this);
            this.model.view = this;
            var $about = this.$about = $('#about', this.$el);
            var scope = this;
            var events = {
                'insertImage' : this.uploadIntro,
            };
            this.imageUploader = new common.fileUploader(this.$el, 'image_file', 'add_script', {
                exts : 'png gif jpeg jpg'.split(' '),
                url : this.model.url() + 'image/',
                success : function(response) {
                    
                    scope.editorImageCallback({ src : response.url, width : 200, height : 200});
                },
                progress : this.progressScriptFn,
                scope : this,
                data : this.model.toJSON(),
                filename : 'file',
                firenow : true
            });
            if (!this.model.isNew()) {
                this.$el.find('button[name=save]').html(common.tr('update'));
                
            }
            else {
            }
            
            this.starDate = new common.DateTimePicker(this.$el.find('#start_at_date_picker')[0],{
                change : $.proxy (function (date){
                    this.model.set ({'start_at' :  date} , {silent : true});
                }, this)
            });
            this.endDate  = new common.DateTimePicker(this.$el.find('#end_at_date_picker')[0],{
                change : $.proxy (function (date){
                    this.model.set ({'end_at' : date} , {silent : true});
                }, this)
            });
            
            new Editor($about, {
                events : events,
                scope : this
            });
        },
        /**
         *
         */
        save : function(event) {
            event.preventDefault();
            var model = this.model;
            var check = model.validateAttributes();
            var scope = this;
            if (check === null) {
                var data = model.toJSON() ;
                model.save({}, {
                    data : $.extend(true, data, {
                        'about' : scope.$about.val()
                    }),
                    success : $.proxy(scope.success, scope),
                    error : scope.error,
                    wait : true
                });
            } else {
                for (var key in check) {
                    $(this.el).find('#error_' + key).html(check[key]).show();
                }
            }
        },
        /**
         *
         */
        cancel : function(e) {
            e.preventDefault();
            Backbone.history.navigate('class/list', true);
        },
        /**
         *
         */
        success : function(model, response) {
            App.vent.trigger('alert', {
                msg : MMC.tr('the course \'1%\' has been successfully saved', this.model.get('title')),
                type : 'success'
            });
            this.model.set({
                'id' : response.id
            }, {
                silent : true
            });
            this.$el.find('button[name=save]').html(MMC.tr('update'));
        },
        /**
         *
         */
        error : function(response) {
            App.vent.trigger('alert', {
                msg : response.message ? MMC.tr('response.message') : MMC.tr('an error has occurred, try again'),
                type : 'danger'
            });
        },
        /**
         *
         */
        uploadIntro : function(editor, callback) {
            if (!this.editorImageCallback) {
                this.editorImageCallback = callback;
            };
            this.imageUploader.fire();
        },
        /**
         *
         */
        successRegister : function(data) {

        },
        progressScriptFn : function() {

        },
        /**
         *
         */
        close : function() {
            ModelBinding.unbind(this);
            this.model.off('sync', this.success);
            this.model.off('error', this.error);
            this.undelegateEvents();
            this.remove();
        },
    });
});
