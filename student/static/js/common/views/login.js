define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'common',
], function($, _, Backbone, App, common) {

  return Backbone.View.extend({
    /**
     * 
     */
    el  : '#login_section',
    /**
     * 
     */
    $registerError : null,
    /**
     * 
     */
    $registerErrorText : null,
    /**
     * 
     */
    initialize : function(options) {
      this.model = options.model;
      this.$el.find('.page-scroll a').bind('click', App.menu.animate);
      this.$registerError = this.$el.find('#register_error');
      this.$registerErrorText = this.$registerError.find('#register_error_text');
        
    },
    /**
     * 
     */
    events: {
        "click #submit": "login",
        "click form": function (){return false;},
    },
    /**
     * 
     * @param {Object} event
     */
    login : function (event) {
        // Don't let this button submit the form
        event.preventDefault(); 
         // Hide any errors on a new submit
        var url = __CONFIG__.baseUrl + 'student/account/j/login/';
        var scope = this;
        var $form  = $('form', this.el);
        var $currentTarget = $(event.currentTarget) ;
        var passwordValue = $form.find ('[name=password]').val();
        var emailValue = $form.find ('[name=email]').val();
        //console.log('Loggin in... ');
        $currentTarget.html ('... <i class="fa fa-spinner"></i>').button('disable').removeClass('btn-success').addClass("btn-primary");
        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            data: $('form', this.el).serialize(),
            success : function (data) {
                if (data.status === "Error"){
                    scope.serverLoginErrror (data.message, $currentTarget);
                }
                else {
                    window.location.replace(__CONFIG__.baseUrl);
                }
            },
            error : function (data){
                scope.serverLoginErrror (data, $currentTarget);
            }
        });
    },
    /**
     * 
     */
    /**
     * Intercept server error
     */
    serverLoginErrror : function (message, $button){
        this.$registerErrorText.html(message);
        this.$registerError.show ();
        $button.html (common.tr('Enter'));
    },
    /**
     * 
     */
    close: function() {
      if (this.callBack){
         this.callBack ();
         document.location.reload(true);
      }
      else {
        window.location.href  = $('#returnUrl', $('form', this.el)[0]).val();    
      };
      this.remove();
    }
    });
});