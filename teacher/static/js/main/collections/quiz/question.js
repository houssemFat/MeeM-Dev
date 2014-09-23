define([
  'jquery',
  'underscore', 
  'backbone',
  'scripts/main/models/quiz/question',
  ], function($, _, Backbone, QuestionModel){

  var QuizQuestionCollection = Backbone.Collection.extend({
        model : QuestionModel,
        url : QuestionModel.prototype.urlRoot,
        
  });
  return QuizQuestionCollection;
});