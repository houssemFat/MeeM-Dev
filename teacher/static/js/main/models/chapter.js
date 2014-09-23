// Filename: models/schedule
define(['underscore', 'backbone', 'helper'], function(_, Backbone, Helper) {
    var ChapterModel = Backbone.Model.extend({
        /**
         *
         */
        defaults : {
            // title 
            title : '',
            // moment js date time , iso iso8601 
            about : '',
            // date 
            assignementCount : 0,
            //
            commentsCount : 0,
            //
            documentsCount : 0,
            //
            created : '',
            //
            released : false,
            
        },
        /**
         * 
         * @param {Object} options
         */
        initialize : function(options) {
            Helper.addCrsfModel (this);
        },
        
    });
    return Helper.extendModel (ChapterModel, '/chapter/');
}); 