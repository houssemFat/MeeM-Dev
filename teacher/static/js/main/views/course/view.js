define(['jquery', 'underscore', 'backbone', 'app', 'text!scripts/main/templates/course/view.html', 'commonUpload'], function($, _, Backbone, App, template) {
    return Backbone.View.extend({
        /**
         *
         */
        initialize : function(options) {
            this.template = _.template(template || "");
        },
        /**
         *
         */
        events : {
            "click #edit" : "editCourse",
        },
        /**
         *
         */
        render : function(options) {
            var model = this.model, me = this;
            me.$el.html(this.template(model.toJSON()));
            model.view = this;
            var scope = this;
            this.imageCoverUploader = new common.fileUploader(this.$el, 'cover_file', 'change_cover', {
                exts : 'png gif jpeg jpg'.split(' '),
                url : this.model.url() + 'cover/',
                success : function(response) {
                    scope.changeCoverCallBack(response);
                },
                progress : this.progressScriptFn,
                scope : this,
                data : this.model.toJSON(),
                filename : 'cover_file',
                firenow : true
            });
        },
        changeCoverCallBack : function(response) {
            this.$el.find('#course-thumbnail-container img').attr({
                'src' : response.url
            });
            this.$el.find('#course-thumbnail-change fa').removeClass('fa-spinner').addClass('fa-upload');
        },
        progressScriptFn : function(response) {
            this.$el.find('#course-thumbnail-change fa').removeClass('fa-upload').addClass('fa-spinner');
        },
        editCourse : function() {
            Backbone.history.navigate('course/' + this.model.get('id') + '/edit', true);
        },
        close : function() {
            this.undelegateEvents();
            this.remove();
        }
    });
});
