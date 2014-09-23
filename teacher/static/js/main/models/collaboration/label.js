// Filename: models/schedule
define(['underscore', 'backbone', 'helper', 'app', 'moment'], function(_, Backbone, Helper , App, moment) {
    var TaskModel = Backbone.Model.extend({
        /**
         *
         */
        defaults : {
            color : '',
            // moment js date time , iso iso8601 
            title : '',
            
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
    return Helper.extendModel (TaskModel, '/collaboration/tasks/label');
}); 