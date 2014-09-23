define(['jquery', 
        'underscore', 
        'backbone', 
        'modelbinding',  
        'app',
        'scripts/main/views/settings/emails/list',
        'scripts/main/collections/user/email',
        'text!scripts/main/templates/settings/emails/main.html'], function($, _, Backbone, ModelBinding, 
        App, ListView, Collection, template) {

    return Backbone.View.extend({
        /**
         *
         */
        template : _.template(template),
        /**
         *
         */
        events : {
            /*'click button#add' : 'add',*/
        },
        /**
         *
         */
        initialize : function(options) {
            _.bindAll(this, 'render', 'close');
        },
        /**
         *
         */
        render : function() {
            this.$el.html(this.template(/*this.model.toJSON()*/));
            var emails = [{email : 'ddf@fdfd.com', primary : true}, {email : 'ddddf@fdfd.com', primary : true}];
            this.listEmailsView = new ListView({ collection : new Collection (emails), $el : this.$el.find('#emails_list')});
            this.listEmailsView.renderCollection();
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
        close : function() {
            /*ModelBinding.unbind(this);
            this.model.off('sync', this.success);
            this.model.off('error', this.error);
            this.undelegateEvents();*/
            this.remove();
        },
    });
});
