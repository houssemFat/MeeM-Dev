// Filename: models/schedule
define([
    'underscore',
    'backbone'], function (_, Backbone) {
    var QuizQuestionResponseModel = Backbone.Model.extend({
        /**
         *
         */
        defaults : {
            response : '',
            is_true : false,
        },
        /**
         * 
         * @param {Object} options
         */
        initialize : function(options) {
            Helper.addCrsfModel (this);
        },
        
    });
    return Helper.extendModel (QuizQuestionResponseModel, '/quiz/response/');
}); 