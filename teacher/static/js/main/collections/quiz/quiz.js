define([
  'jquery',
  'underscore', 
  'backbone',
  'scripts/main/models/quiz/quiz',
  ], function($, _, Backbone, QuizModel){

  var QuizCollection = Backbone.Collection.extend({
        model : QuizModel,
        url : QuizModel.prototype.urlRoot,
        
  });
  return QuizCollection;
});