define(['jquery', 
        'underscore', 
        'backbone', 
        'modelbinding',  
        'app',
        'text!scripts/main/templates/settings/general.html'], function($, _, Backbone, ModelBinding, 
        App, template) {

    return Backbone.View.extend({
        /**
         *
         */
        template : _.template(template),
        /**
         * 
         */
        formBindings : {
            'change #title' : 'title',
            'change #about' : 'about',
            'change #start_at' : 'start',
            'change #end-at' : 'end',
        },
        /**
         *
         */
        events : {
            'click button#save' : 'save',
        },
        /**
         *
         */
        initialize : function(options) {
            _.bindAll(this, 'render', 'close', 'success', 'error', 'change');
            /*this.model.on('sync', this.success);
            this.model.on('change', this.change);
            this.model.on('error', this.error);
            this.documentCollection = options.documents ;*/
        },
        /**
         *
         */
        render : function() {
            this.$el.html(this.template(/*this.model.toJSON()*/));
            /*var scope = this;
            this.documentListView = new DocumentListView ({collection : this.documentCollection, $el  : this.$el.find('#video_documents')});
            this.documentListView.render ();
            ModelBinding.bind(this);
            if (!this.model.isNew()) {
                this.$el.find('button#save').html(MMC.tr('update'));
                this.activeUpload ();
            }
            else{
                this.$el.find('#add_file, #add_script').attr('disabled','disabled');
            }
            // validate 
            this.change ();*/
        },
        /**
         *
         */
        successScriptFn : function(response) {
            this.model.set(response, {silent : true});
            this.$el.find('#scriptname').html (this.model.get('scriptname'));
        },
        
        /**
         *
         */
        successFileFn : function(response) {
            var model = new DocumentModel (response);
            this.documentCollection.add (model);
        },
        
            
        /**
         *
         */
        save : function(event) {
            var model = this.model;
            var valid = model.validateAttributes();
            var scope = this ;
            if (valid == "ok") {
                model.save({}, {
                        data : model.toJSON(),
                        success : scope.success,
                        error : scope.error,
                        wait : true
                    });
            } else {
                for (var key in check) {
                    $(this.el).find('#error_' + key).html(check[key]).show();
                    ;
                }
            }
        },
        /**
         *
         */
        change : function(model) {
            var valid = this.model.validateAttributes();
            var $button  = this.$el.find('button#save');
            if (valid == "ok")
                $button.removeAttr('disabled');
            else 
                $button.attr ("disabled", "disabled");
        },
        /**
         *
         */
        success : function(model, response) {
            App.vent.trigger('alert', {
                msg : common.tr('the course \'1%\' has been successfully saved', this.model.get('title')),
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
        activeUpload : function (){
            if (this.canUploadFiles)
                return true ;
            new FileUploader ({scope : this});
            this.canUploadFiles = true ;
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
        close : function() {
            /*ModelBinding.unbind(this);
            this.model.off('sync', this.success);
            this.model.off('error', this.error);
            this.undelegateEvents();*/
            this.remove();
        },
    });
});
