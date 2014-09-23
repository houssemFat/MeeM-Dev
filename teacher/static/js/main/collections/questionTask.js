define([
  'jquery',
  'underscore', 
  'backbone',
  'scripts/main/models/questionTask',
  ], function($, _, Backbone, QuestionTaskModel){
  var QuestionTaskCollection = Backbone.Collection.extend({
        model : QuestionTaskModel,
        url : 'teacher/questionTask/',
        
  });
  return QuestionTaskCollection;
});