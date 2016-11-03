define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'scripts/main/models/user',
], function($, _, Backbone, App, User) {

  return Backbone.View.extend({
    /**
     * 
     * 
     */
    el : '#register_section',
    /**
     * 
     * 
     */
    authenticationType : '1',
    /**
     * 
     * 
     */
    authenticationChoices : { 0 : 'email', 1 : 'phone'},
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
    $button : null,
    /**
     * 
     */
    comfirmSmsUrl : null,
    /**
     * 
     */
    initialize:function () {
        this.$el.find('.page-scroll a').bind('click', App.menu.animate);
        this.$registerError = this.$el.find('#register_error');
        this.$registerErrorText = this.$registerError.find('#register_error_text');
        this.$button = this.$el.find('button[name=register]');
    },
    /**
     * 
     */
    events: {
        "click button[name=register]": "register",
        "click form": "submit",
        "change #authentication_type": "changeAuthenticationType",
    },
    /**
     * 
     */
    submit : function (){
        return false ;
    },
    /**
     * 
     */
    changeAuthenticationType : function (event){
        var select = this.$el.find('select#authentication_type')[0];
        var value = select[select.selectedIndex].value ;
        this.$el.find('#' + this.authenticationChoices[value] + '_container').show();
        var lastState = this.authenticationChoices[this.authenticationType] ;
        this.$el.find('#' + lastState + '_container').hide();
        this.$el.find('#' + lastState + '_value').val("");
        this.authenticationType = value;
    },
    /**
     * Intercept server error
     */
    serverRegisterErrror : function (message){
        this.$registerErrorText.html(message);
        this.$registerError.show ();
        this.$button.html ('الاشتراك');
    },
    /**
     * 
     * @param {Object} event
     */
    register:function (event) {
        // Don't let this button submit the form
        event.preventDefault();
        // Hide any errors on a new submit
        var url =  __CONFIG__.baseUrl + 'student/account/j/register/';
        this.$registerError.hide ();
        this.$registerErrorText.html('');
        var scope = this ;
        // console.log('Loggin in... ');
        this.$button.html ('... <i class="fa fa-spinner"></i>').button('disable');
        $.ajax({
                url:url,
                type:'POST',
                dataType:"json",
                data : $('form', this.el).serialize(),
                success : function (data) {
                    // console.log(["Login request details: ", data]);
                    if(data.status == "Error") {  
                        // If there is an error, show the error messages
                       var results = $.parseJSON(data.message);
                       var results_ ;
                       var $htmlError_ ;
                       var alertView;
                       var $htmlError = $('<ul></ul>').addClass('list-unstyled');
                       for (var key in results){
                           results_ = results[key] ;
                           for (var index in results_){
                               $htmlError_  = $('<ul></ul>').addClass('list-unstyled');
                               $htmlError_.append ("<li>" + results_[index] + "</li>");
                           }
                           $htmlError.append ("<li>" + key + ": "+ $htmlError_[0].outerHTML + "</li>");
                       }
                       scope.serverRegisterErrror ($htmlError[0].outerHTML);
                    }
                    else { 
                        var alertObject = null ;
                        if (parseInt(data.auth_type) === 1){
                            scope.comfirmSmsUrl = data.comfirmUrl;
                            alertObject = {
                               events : {'primary confirm' : function ($element) {scope.validPhoneNumber ();}},
                               msg : 'Entrer le nombre envoyé par sms',
                               html : '<input id="comfirm_phone" class="form-controls">',
                           };
                        }
                        else {
                            alertObject = {
                               events : {'primary ok' : function () {alertView.close();}},
                               msg : 'Veuillez valider votre compte',
                           };
                        }
                        // alert now 
                        require (['appAlert'], function (View) {
                           alertView = new View (alertObject);
                        });
                    }
                },
                error : function (error){
                    scope.serverRegisterErrror (error);
                }
            });
    },
    /**
     * Intercept server error
     */
    validPhoneNumber : function ($element){
        $.ajax({
                url : this.comfirmSmsUrl,
                type:'POST',
                dataType:"json",
                data : $('form', this.el).serialize(),
                success : function (data) {
                    alert ('open account'); 
                },
                error : function (){
                }
        });
    },
    });
});