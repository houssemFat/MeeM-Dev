define(['jquery', 'underscore', 'backbone', 'app', 'text!scripts/main/templates/document/list.html', 'scripts/main/views/document/item', 'scripts/main/models/document', 'helper', 'commonUpload'], function($, _, Backbone, App, template, ItemView, DocumentModel, Helper, CommonUploader) {
    var documentListView = Backbone.Marionette.CompositeView.extend({
        /**
         *
         */
        courseId : null,
        /**
         *
         */
        $empty : null,
        /**
         *
         */
        $container : null,
        /**
         *
         * @param {Object} options
         */
        initialize : function(options) {
            this.template = _.template(template);
            _.bindAll(this, "updateCount");
            this.collection.bind('add', this.updateCount);
            this.model = new DocumentModel({
                chapter_id : options.chapterId
            });
        },
        updateCount : function() {
            this.$total.html (this.collection.length);
        },

        /**
         *
         */
        renderModel : function() {
            this.$el.html(this.template({
                id : this.courseId,
                count : this.collection.length
            }));

            this.$empty = this.$el.find("#list_empty");
            this.$container = this.$el.find("#list_view");
            this.$total = this.$el.find("#list_count");
            if (this.collection.length === 0) {
                this.$container.hide();
                this.$empty.show();
            }
            var scope = this;
            // uplaod documents
            new common.fileUploader(this.$el, 'course_document', 'add_document', {
                exts : 'pdf txt doc docx'.split(' '),
                url : this.collection.url,
                success : this.successFileFn,
                progress : this.progressFileFn,
                scope : this,
                data : this.model.toJSON(),
                filename : 'course_document'
            });
            this.$el.find('#add_file').removeAttr('disabled');
        },
        /**
         *
         */
        itemView : ItemView,
        /**
         *
         * @param {Object} collectionView
         * @param {Object} itemView
         * @param {Number} index
         */
        appendHtml : function(collectionView, itemView, index) {
            this.$container.append(itemView.el);
        },
        /**
         *
         * @param {JSON} response
         */
        successFileFn : function(response) {
            this.collection.add(response);
            if (this.collection.length == 1) {
                this.$container.hide();
                this.$empty.show();
            }
        },
        /**
         *
         * @param {JSON} response
         */
        progressScriptFn : function(response) {

        },

        /**
         *
         */
        close : function() {
            this.remove();
        }
    });
    return documentListView;
});

