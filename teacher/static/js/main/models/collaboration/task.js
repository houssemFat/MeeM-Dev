// Filename: models/schedule
define(['underscore', 'backbone', 'helper', 'app', 'moment'], function(_, Backbone, Helper , App, moment) {
    var TaskModel = Backbone.Model.extend({
        /**
         *
         */
        defaults : {
            label : 'label',
            title : '',
            // moment js date time , iso iso8601 
            start : '',
            // moment js date time , iso iso8601 
            end : '',
            title : '',
            progress : 0,
            created_at : 0,
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
    return Helper.extendModel (TaskModel, '/collaboration/tasks/');
}); 