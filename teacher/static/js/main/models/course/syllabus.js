// Filename: models/schedule
define(['underscore', 'backbone', 'helper', 'moment'], function(_, Backbone, Helper , moment) {
    var SyllabusModel = Backbone.Model.extend({
        /***
         * 
         */
        validations : {
            'title' : {
                'required' : true ,
                'min_length' : 10  
            },
            'about' : {
                
            },
            'order' : {
                'required' : true ,
                'type' : 'int'
            },
        },
        /**
         *
         */
        defaults : {
            title : '',
            about : '',
            order  : 0,
            last_update : new moment()
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
    return Helper.extendModel (SyllabusModel, '/course/syllabus/');
}); 