// Filename: models/schedule
define(['underscore', 'backbone', 'helper', 'moment'], function(_, Backbone, Helper , moment) {
    var ForumModel = Backbone.Model.extend({
        /***
         * 
         */
        validations : {
            'title' : {
                'required' : true ,
                'min_length' : 10  
            },
            'explanation' : {
                
            },
            'max_attempts' : {
                'required' : true ,
                'type' : 'int'
            },
            'total' : {
                'required' : true ,
                'type' : 'int'
            },
        },
        /**
         *
         */
        defaults : {
            title : '',
            explanation : '',
            // moment js date time , iso iso8601 
            max_attempts : 3,
            note  : 50 ,
            total  : 100,
            in_grade  : true,
            is_timed : true,
            duration : 10,
            display_type : 0,
            due_at : moment (),
            end_at : moment ()
        },
        /**
         * 
         */
        toJSON: function () {
            var data = Backbone.Model.prototype.toJSON.call(this);
            for (key in data){
                value = data[key];
                if (_.isObject (value) && value._isAMomentObject){
                    data [key] = value.toISOString();
                }
            }
            return data;
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
    return Helper.extendModel (ForumModel, '/course/forum/');
}); 