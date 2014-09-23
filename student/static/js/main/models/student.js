// Filename: js/scripts/main/models/student.js
define([
    'underscore',
    'backbone',
    'app',
    'common',
    'scripts/main/models/user'], function (_, Backbone, App, common, userModel) {
    var StudentModel = userModel.extend({
        /**
         * 
         */
        urlRoot : '/j/student' ,
        /**
         * 
         */
        url : function (){return this.urlRoot + '/' + this.id ;},
        /**
         * 
         */
        defaults: {
            name : 0,
            thumbnail : 'http://127.0.0.1:8000/static/img/profile.jpg',
            score : ''
        },
    });
    return StudentModel ;
});