// Filename: models/schedule
define([
    'underscore',
    'backbone'], function (_, Backbone) {
    var EmailModel = Backbone.Model.extend({
        idAttribute : 'email',
        /**
         *
         */
        defaults : {
            email : '',
            is_primary : false,
        },
        /**
         * 
         * @param {Object} options
         */
        initialize : function(options) {
            Helper.addCrsfModel (this);
        },
        
    });
    return Helper.extendModel (EmailModel, '/accounts/settings/emails');
}); 