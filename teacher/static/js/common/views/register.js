define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'scripts/main/models/webUser',
  'common'
], function($, _, Backbone, App, WebUser, common) {

  return Backbone.View.extend({
    el : '#register_modal', 
    initialize:function () {
        //this.template = _.template(template || "");
        //console.log('Initializing Login View');
    },

    events: {
        "click button[name=register]": "register",
        "click form": "submit",
    },
    render:function () {
        return this;
    },
    show : function (){
        common.Widget.displayModal(this.el, { bgcolor :  '#ccc'});
        
    },
    submit : function (){
        return false ;
    },
    register:function (event) {
            event.preventDefault(); // Don't let this button submit the form
             // Hide any errors on a new submit
            var url = __CONFIG__.baseUrl + '/register',
                $error = $('.alert-error', this.el);
            $error.hide();
            console.log('Loggin in... ');
            $(event.currentTarget).html ('... <i class="fa fa-spinner"></i>').button('disable');
            $.ajax({
                url:url,
                type:'POST',
                dataType:"json",
                data: $('form', this.el).serialize(),
                success:function (data) {
                    console.log(["Login request details: ", data]);
                    if(data.error) {  // If there is an error, show the error messages
                        $error.text(data.error.text).show();
                    }
                    else { // If not, send them back to the home page
                        window.location.replace('#');
                    }
                },
                error : function (){
                    
                }
            });
        }
    });
});