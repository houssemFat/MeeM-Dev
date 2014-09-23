define(['jquery', 'underscore', 'backbone', 'modelbinding', 'scripts/main/models/chapter', 'text!scripts/main/templates/chapter/form.html', 'app', 'scripts/main/collections/chapter'], function($, _, Backbone, ModelBinding, CourseModel, template, App, ChapterCollection) {
    return Backbone.View.extend({
        /**
         *
         */
        template : _.template(template),
        /**
         * 
         */
        $saveBtn : null,
        /**
         *
         */
        formBindings : {
            'change #text' : 'text',
            'change #max_attempts' : 'max_attempts',
            'change #explanation' : 'explanation',
            'change #note' : 'note',
            'change #quiz_type' : 'quiz_type',
            'change #with_input' : 'with_input',
        },
        /**
         *
         */
        events : {
            'click button#save' : 'save',
            'click button#add_suggestion' : 'addSuggestion',
        },
        /**
         *
         */
        initialize : function(options) {
            _.bindAll(this, 'render', 'close', 'success', 'error', 'change');
            this.model.on('sync', this.success);
            this.model.on('change', this.change);
            this.model.on('error', this.error);
        },
        /**
         *
         */
        render : function() {
            var isNew = this.model.isNew() ;
            this.$el.html(this.template(_.extend ({}, this.model.toJSON(), {isNew : isNew})));
            this.$saveBtn = this.$el.find('button#save');
            ModelBinding.bind(this);
            // validate
            this.change();
            if (!isNew) {
                this.$saveBtn.html(MMC.tr('update'));
            }
            //
            this.checkForSuggestions();
        },
        /**
         *
         */
        addSuggestion : function(event) {
            event.preventDefault();
            this.responseListView.collection.add({
                quiz_id : this.model.get('id')
            });
        },
        /**
         *
         */
        checkForSuggestions : function() {
            if (this.model.isNew()) {
                this.$el.find('#add_suggestion').attr('disabled', 'disabled');
            } else {
                this.$el.find('#add_suggestion').removeAttr('disabled');
            }
        },
        /**
         *
         */
        save : function(event) {
            event.preventDefault();
            var model = this.model;
            var valid = model.validateAttributes();
            var scope = this;
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
        success : function(model, response) {
            App.vent.trigger('alert', {
                msg : MMC.tr('the course \'1%\' has been successfully saved', this.model.get('title')),
                type : 'success'
            });
            this.$saveBtn.html(MMC.tr('update'));
            this.checkForSuggestions();
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
        change : function(model) {
            var valid = this.model.validateAttributes();
            var $button = this.$saveBtn;
            if (valid == "ok")
                $button.removeAttr('disabled');
            else
                $button.attr("disabled", "disabled");
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
