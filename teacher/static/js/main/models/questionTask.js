// Filename: models/schedule
define([
    'underscore',
    'backbone',
    'app',
    ]
    , function (_, Backbone, App) {
    var QuestionTaskModel = Backbone.Model.extend({
        urlRoot : __CONFIG__.baseUrl +  'api/teacher/questionTask',
        /**
         * 
         */
        defaults: {
               title  : ''//schema.ObjectId
              , help    : ''
              , type : 'text'
        },
    });
    return QuestionTaskModel ;
});