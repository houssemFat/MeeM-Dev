// Filename: models/invitation
define(['underscore', 'backbone', 'helper', 'app', 'moment'], function(_, Backbone, Helper , App, moment) {
    var InvitationModel = Backbone.Model.extend({
        /**
         *
         */
        defaults : {
            fromuser : '',
            usermail : '',
            // moment js date time , iso iso8601 
            sent_at : '',
            accepted : false
        },
        /**
         * 
         * @param {Object} options
         */
        initialize : function(options) {
            Helper.addCrsfModel (this);
        }
        
    });
    // extend model
    return Helper.extendModel (InvitationModel, '/collaboration/invitations/');
}); 