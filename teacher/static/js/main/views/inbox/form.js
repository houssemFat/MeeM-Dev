define(['jquery', 'underscore', 'backbone', 'modelbinding', 'app', 'scripts/main/models/message', 'text!scripts/main/templates/inbox/form.html', 'text!scripts/main/templates/inbox/typeahead.html'], function($, _, Backbone, ModelBinding, App, MessageModel, template, typeaheadTemplate) {

    return Backbone.View.extend({
        /**
         *
         */
        template : _.template(template),
        $saveBtn : null,
        /**
         *
         */
        formBindings : {
            'change #subject' : 'subject',
            'change #message' : 'message',
            'change #recievers' : 'reciever',
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
            this.model.on('sync', this.success);
            this.model.on('change', this.change);
            this.model.on('error', this.error);
        },
        /**
         *
         */
        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            /* */
            common.autoComplete(this.$el.find('#recievers')[0], {
                dataType : 'json',
                'url' : MessageModel.prototype.urlRoot + '/qsearch',
                getItem : function(object) {
                    _.extend(object, {'thumb' : "dsdsd"});
                    return {
                        template : _.template (typeaheadTemplate)(object),
                        value : object.username,
                        
                    };
                },
                animate : true,
                click : this.autoClick,
                scope : this,
                onRender : this.onAutoRender
            });
            this.$saveBtn = this.$el.find('button#save');
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
            Backbone.history.navigate('inbox', true);
        },
        
        /**
         *
         */
        autoClick : function(model, response) {
            Backbone.history.navigate('inbox', true);
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
