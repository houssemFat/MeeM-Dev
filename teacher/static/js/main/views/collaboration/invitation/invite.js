define(['jquery', 'underscore', 'backbone', 'app', 'text!scripts/main/templates/classroom/invite.html', 
'scripts/common/views/modal'], function($, _, Backbone, App, template, ModalConfirmView) {
    var InvitaionManger = Backbone.View.extend({
        /**
         * 
         */
        emails_ : [],
        /**
         * 
         */
        text : null,
        /**
         *
         */
        initialize : function(options) {
            this.$el.html(_.template(template)({username  : App.username}));
            this.on('view:readyView', this.readyView);
            this.on('view:confirm', this.invitePeople);
            this.on('view:blur', this.blur);
            this.on('view:keyUp', this.keyUp);
            this.on('view:submit', function() {
                return false;
            });
            var events = {
                'keyup #send_to_email' : 'keyUp',
                'blur #send_to_email' : 'blur',
                'submit form' : function() {
                    return false;
                }
            };
            var context = this ;
            var modalConfirmView = new ModalConfirmView({
                header : common.tr('invite') + ' '+ common.tr('staff'),
                ok : common.tr('Send') ,
                dismiss : common.tr('Close'),
                body : this.$el.html(),
                scope : context,
                events : events
            });
            modalConfirmView.render();
            this.modalConfirmView = modalConfirmView;
            
            this.$listMailsContent  = this.modalConfirmView.$el ;
            if (options.list) {
                _.forEach(options.list, function(mail) {
                    context.appendHtmlValue(mail);
                });
            };
        },
        /**
         *
         */
        bindEmails : function(event) {
            var emails = this.emails_;
            var input = event.currentTarget;
            var value = input.value;
            var context = this;
            if (emails.indexOf(value) > -1)
                return;
            // #debug
            // console.log (value);
            if (common.isEmail(value)) {
                this.appendHtmlValue(value);
                input.value = '';
            } else {
                $(this).css({
                    color : 'red'
                });
                var object = this;
                setTimeout(function() {
                    $(object).css({
                        color : ''
                    });
                }, 2000);
            }
        },
        /**
         * 
         */
        appendHtmlValue : function(value) {
            var context = this ,
                jListContainer = this.$listMailsContent.find('#send_to_list_addresses:eq(0)'), 
                jParent = $('<span class="' + 'app-t-email-item-message"></span>'), 
            parent = jParent[0];
            $('<span class="app-t-email-item-text">' + value + '</span>').appendTo(parent);
            jParent.appendTo(jListContainer);
            var close = $('<span ' + 'class="delete hand" >' + '×</span>').appendTo(parent).click(function() {
                jParent.remove();
                context.emails_ = common.popFromArray(context.emails_, value);
            });
            context.emails_.push(value);
        },
        /**
         *
         */
        keyUp : function(event) {
            /**
             * @this {HTMLInputElement}
             */
            if ((event.keyCode == 13) || (event.keyCode == 32)) {
                this.bindEmails.call(this, event);
            };
            console.log(event.keyCode);
        },
        /**
         *
         */
        blur : function(event) {
            this.bindEmails.call(this, event);
        },
        /**
         * Add excluded choice
         */
        invitePeople : function(event) {
            var length = this.emails_.length;
            var emails = this.emails_;
            var emailsString = '';
            var $content = this.$listMailsContent ;
            var text = $('textarea', $content).val();
            if (length < 1)
                return;
            for (var i = 0; i < length; i++) {
                emailsString += emails[i];
                if (i < length - 1)
                    emailsString += '#';
            }
            // hide the element
            common.Widget.overlay($content, 'loading');
            $.post(
                App.collaborators.url + '/invitations/invite/',
                common.django.appendcsrf({
                        list : emailsString,
                        message : text}
                    ),
                $.proxy(this.successSubmit, this, $content)
            );
        },
        /**
         *  
         */
        successSubmit : function($content, response) {
            // TODO check for responses state (error, limit exceeded, success)
            common.Widget.unOverlay($content);
            this.close();
        },
        /**
         * handles the success of alert
         * @param {JSON} data
         */
        close : function() {
            this.remove();
            this.modalConfirmView.close();
        },
    });
    return InvitaionManger;
}); 