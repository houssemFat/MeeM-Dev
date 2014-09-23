// Filename: js/scripts/main/models/course.js
define([
    'common',
    'scripts/main/models/base'], function (common, baseModel) {
    var CourseModel = baseModel.extend({
        /**
         * 
         */
        baseRoot : 'course/' ,
        /**
         * 
         */
        url : function (url){
                return this.urlRoot () + ( this.id ? (this.id + '/'): '') + ( url ? ( url + '/' ): '') ;
        },
        /**
         * 
         */
        defaults: {
            chaptersCount : 0,
            followers : 0 ,
            type : null,
            teacher : '',
            image : ''
        },
        /**
         * 
         */
        register : function (message){
            var scope = this ;
            $.ajax({
                        type: 'post',
                        url : this.urlRoot + '/register',
                        data : {'id' : this.id , 
                                'ajax' : true, 
                                YII_CSRF_TOKEN : __CONFIG__.yii_csrf,
                                'message' : message },
                        dataType: 'json',
                        success  : $.proxy(this.successRegister, this),
                        error : $.proxy(this.errorRegister, this),
                    });
        },
        /**
         * 
         */
        successRegister : function (data){
            if (data.error){
                this.errorRegister  ({'responseText' : data.error});
                return ;
            }
            // success
            var $parent = $('.save-it', this.view.$el[0]).closest('.app-course-menu');
            $body = $parent.parent ();
            $parent.remove ();
            $('<div class="app-course-saved"><i class="fa app-course-saved-color fa-check fa-2x" title="Already in my course"></i></div>').appendTo($body);
        },
        /**
         * 
         */
        errorRegister : function (response){
            $('i.fa-clock-o', this.view.$el[0]).removeClass('fa-clock-o').addClass('fa-save');
            var message = response.responseText; 
            if (
                (message.indexOf("Login Required") > -1) || 
                (message.indexOf("Identifiant requis")>-1)
                ){
                App.vent.trigger('webUser:guest', 
                {message :  "Please Login to access register " + this.get ('title') ,
                    fn : this.register,
                    scope : this 
                });
            };
             
        },
    });
    return CourseModel ;
});