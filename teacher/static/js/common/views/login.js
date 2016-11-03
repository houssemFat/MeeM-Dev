define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'scripts/main/models/webUser',
  'common'
], function($, _, Backbone, App, WebUser, common) {

  return Backbone.View.extend({
    el : '#login_modal',
    initialize: function() {
      this.model = new WebUser;
    },
    events: {
        "click #loginButton": "login",
        "click #singup": function (){
             App.vent.trigger('webUser:new',{});
         },
    },
    render : function (data) {
        return this;
    },
    show : function (data){
        var data = data || {},
            $error = $('.alert-error', this.el) ;
        if (data.message){
            $error.text(data.message).show();
        }
        else 
            $error.hide();
        // excute call back function 
        if (data.fn)
        this.callBack = function (){
            data.fn.call (data.scope);
        };
        else
            this.callBack = null ;   
        common.Widget.displayModal(this.el, { bgcolor :  '#ccc'});
    },
    login : function (event) {
            event.preventDefault(); // Don't let this button submit the form
             // Hide any errors on a new submit
            var url = __CONFIG__.baseUrl + 'jsc/login',
                $error = $('.alert-error', this.el),
                scope = this ;
            $error.hide();
            console.log('Loggin in... ');
            $(event.currentTarget).html ('... <i class="fa fa-spinner"></i>').button('disable');
            $.ajax({
                url:url,
                type:'POST',
                dataType:"json",
                data: $('form', this.el).serialize(),
                success:function (data) {
                    $(event.currentTarget).html (common.tr('singin'));
                    console.log(["Login request details: ", data]);
                    if(data.error) {  // If there is an error, show the error messages
                       var error = data.error,
                           errorString = '';
                       for (var key in error){
                           for (var _key in error[key]){
                               errorString += '* ' + error[key][_key] + '<br/>' ;
                           }
                                  
                       }
                       $error.empty().append($('<span>'+ errorString + '</span>')).show();
                    }
                    else { 
                         var model = scope.model;
                         model.set(data);
                         scope.close();
                    }
                },
                error : function (){
                    $error.text("Some thing get wrong").show();
                    $(event.currentTarget).html ('Try again');
                }
            });
        }
    ,
    close: function() {
      if (this.callBack){
         this.callBack ();
         document.location.reload(true);
      }
      else {
        window.location.href  = $('#returnUrl', $('form', this.el)[0]).val();
        //App.vent.trigger('webUser:init', $.extend({'sourceLogin' : 'local' }, this.model));    
      };
      common.Widget.hideModal();
      this.remove();
    }
    });
});