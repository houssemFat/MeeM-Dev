// Filename: models/collaborator
define(['underscore', 'backbone', 'helper'], function(_, Backbone, Helper) {
    return Helper.extendModel(Backbone.Model.extend({
        /**
         *
         */
        defaults : {
            name : '',
            created_at : '',
            bg : common.getRandomColor ()
        },
        /**
         * 
         * @param {Object} options
         */
        initialize : function(options) {
            Helper.addCrsfModel (this);
        }
    }), '/collaboration/teams/');
}); 