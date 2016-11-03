// Filename: models/teacher
define(['underscore', 'backbone', 'helper'], function(_, Backbone) {
    var UserModel = Backbone.Model.extend({
        /**
         * 
         */
        profileUrl : function (url){
            var url = url || "";
            return this.baseURL + '/accounts/profile/' + url ;
        },
        /**
         *
         */
        defaults : {
            coursesCount : 0,
            cover : '',
            username :'',
            name :'',
            lastname :'',
            about : '',
            skills : '',
            hobbies : '',
            facebook_link : '',
            twitter_link : '',
            google_plus_link : '',
        },
        /**
         * 
         * @param {Object} options
         */
        initialize : function(options) {
            Helper.addCrsfModel (this);
        },
        
    });
    return Helper.extendModel (UserModel, '/');
});
