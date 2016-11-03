define(['jquery', 
        'underscore', 
        'backbone', 
        'app', 
        'text!scripts/main/templates/video/view.html', 
        'customPlayer', 
        'scripts/main/views/video/fileUploader',
        'scripts/main/views/video/document/list',
        'scripts/main/models/video/document',
        'assests/views/comment/main',], function($, _, Backbone, App, template, player, FileUploader, DocumentListView, DocumentModel, CommentManager) {
    return Backbone.View.extend({
        /**
         *
         */
        initialize : function(options) {
            this.template = _.template(template || "");
            this.documentCollection = options.documents ;
        },
        canUploadFiles : false,
        /**
         *
         */
        events : {
            'click button#edit' : 'edit',
        },
        /**
         *
         */
        render : function(options) {
            this.$el.html(this.template(this.model.toJSON()));
            this.documentListView = new DocumentListView ({collection : this.documentCollection, $el  : this.$el.find('#video_documents')});
            this.documentListView.render ();
            common.loadCss('/ccss/video-player/player.css');
            videojs(this.$el.find('#main_video')[0], {
                plugins : {
                    'timeUpdatePlugin' : {
                        fn : this.progressVideoFn,
                        scope : this
                    },
                },

            }, function() {
                // This is functionally the same as the previous example.
            });

            if (!this.model.isNew()) {
                this.activeUpload();
                new CommentManager ({model_id :  this.model.get('content_type'), obj_id : this.model.get('id')});
            } else {
                this.$el.find('#add_file, #add_script').attr('disabled', 'disabled');
            }
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
        activeUpload : function() {
            if (this.canUploadFiles)
                return true;
            new FileUploader({
                scope : this
            });
            this.canUploadFiles = true;
        },

        /**
         *
         */
        progressScriptFn : function(time, total) {

        },
        
        /**
         *
         */
        progressFileFn : function(time, total) {

        },
        /**
         *
         */
        uploadDocument : function(time, total) {
            this.documentView.show();
        },
        /**
         *
         */
        uploadVideo : function(time, total) {
            this.videoAddView.select();
        },
        /**
         *
         */
        viewTools : function() {
            // App.router.before ();
            var scope = this;
            require(['scripts/main/views/tools/select'], function(SelectToolView) {
                var formView = new SelectToolView({
                    collection : toolsCollection,
                    chapterId : scope.model.id
                });
                //App.mainRegion.show(formView);
                //App.router.after ('tools');
            });
        },

        /**
         *
         * @param {Event} e
         */
        edit : function(e) {
            e.preventDefault();
            Backbone.history.navigate('chapter/video/:id/edit'.replace(':id', this.model.get('id')), true);
        },
        /*
         *
         * @param {Object} event
         */
        close : function(event) {
            this.remove();
        }
    });
});
