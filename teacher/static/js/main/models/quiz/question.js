// Filename: models/schedule
define(['underscore', 'backbone', 'helper', 'moment'], function(_, Backbone, Helper , moment) {
    var QuizModel = Backbone.Model.extend({
        /***
         * 
         */
        validations : {
            'question' : {
                'required' : true ,
                'min_length' : 10  
            },
            'max_attempts' : {
                'required' : true ,
                'type' : 'int'
            },
            'max_attempts' : {
                'required' : true ,
                'type' : 'int'
            },
            'note' : {
                'required' : true ,
                'type' : 'int'
            },
        },
        /**
         *
         */
        defaults : {
            question : '',
            help : '',
            correction : '',
            // moment js date time , iso iso8601 
            max_attempts : 3,
            note  : 50 ,
            with_input : false,
            question_type : 'multiple'
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
    return Helper.extendModel (QuizModel, '/course/quiz/question');
}); 