// Filename: models/schedule
define(['underscore', 'backbone', 'helper', 'app', 'moment'], function(_, Backbone, Helper , App, moment) {
    var DocumentModel = Backbone.Model.extend({
        /**
         *
         */
        defaults : {
            title : 'my file',
            created : '',
        },
        /**
         * 
         * @param {Object} options
         */
        initialize : function(options) {
            Helper.addCrsfModel (this);
           
        },
        
    });
    // extend model
    return Helper.extendModel (DocumentModel, '/chapter/document/');
}); 