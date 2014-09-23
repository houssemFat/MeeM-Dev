define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/classroom/invite.html',
  'scripts/common/views/modal'
  ], function($, _, Backbone, App, template, ModalConfirmView) {
    var InvitaionManger = Backbone.View.extend({
        courseId : null,
        emails_ : [],
        text : null,
        initialize : function(options) {
            this.$el.html (_.template(template)({username :  App.username}));
            this.on('view:readyView', this.readyView);
            this.on('view:confirm', this.invitePeople);
            this.on('view:blur', this.blur);
            this.on('view:keyUp', this.keyUp);
            this.courseId = options.courseId,
            this.on('view:submit', function() {return false;});
          var events =  {
                    'keyup #send_to_email' : 'keyUp',
                    'blur #send_to_email' : 'blur',
                    'submit form': function() {return false;}
                },
            modalConfirmView = new ModalConfirmView({
                    header : common.tr('invite students'),
                    ok :  common.tr('send invitations'),
                    dismiss : common.tr('Cancel'),
                    body   : this.$el.html(),
                    scope : this,
                    events : events
                });
        modalConfirmView.render ();
        this.modalConfirmView = modalConfirmView ;
    },
    /**
     *  
     */
    bindEmails : function(event, $content){
        var emails = this.emails_,
            input =event.currentTarget,
            value =  input.value,
            jListContainer = $content.find ('#send_to_list_addresses:eq(0)'),
            context = this ;
        if (emails.indexOf(value) > -1)
            return;
        // #debug
        console.log (value);
        if (common.isEmail(value)) {
            var jParent = $('<span class="' +
                    'app-t-email-item-message"></span>'),
                parent = jParent[0];
            $('<span class="app-t-email-item-text">' +
                value + '</span>').appendTo(parent);
                jParent.appendTo(jListContainer);
            var close = $('<span ' +
                'class="delete hand" >' +
                '×</span>').appendTo(parent).click(
                    function() {
                        jParent.remove();
                        context.emails_ =
                            common.popFromArray(emails, value);
                    }
                );
                context.emails_.push(value);
                input.value = '';
        }
        else {
            $(this).css({color: 'red'});
            var object = this;
            setTimeout(
                function() {
                    $(object).css({color: ''});
                },
                2000
            );
        }
     },
    keyUp : function (event, content){
        /**
         * @this {HTMLInputElement}
        */
        if ((event.keyCode == 13) || (event.keyCode == 32)) {
            this.bindEmails.call(this, event, content);
        };
        console.log (event.keyCode);
    },
    /**
     * 
     */
    blur : function (event, content){
        this.bindEmails.call(this, event, content);
    },
    /**
     * Add excluded choice
     */
    invitePeople : function(event, content) {
        var length = this.emails_.length,
            emails = this.emails_,
            emailsString = '',
            text = $('textarea', content).val();
        if (length < 1)
            return;
        for (var i = 0; i < length; i++) {
            emailsString += emails[i] ;
            if (i < length - 1)
                emailsString += '#';
        }
        // hide the element
        common.Widget.overlay(content[0], {selector : '#glabal_modal_confirm_body' });
        $.post(
            App.students.url + '/invite/',
            $.extend(
                {list : emailsString, text: text, cid : this.courseId},
                { csrfmiddlewaretoken : __CONFIG__.csrf }
            ),
            $.proxy(this.successSubmit, this, content[0])
        );
    },
    /**
     * handles the success of alert
     * @param {JSON} data
     */
    successSubmit: function(content,  data) {
        common.Widget.unOverlay(content);
        this.close ();
    },
    /**
     * handles the success of alert
     * @param {JSON} data
     */
    close: function() {
        this.remove ();
        this.modalConfirmView.close ();
    },
  });
  return InvitaionManger ;
});