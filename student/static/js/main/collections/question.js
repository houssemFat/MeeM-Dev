define([
  'jquery',
  'underscore', 
  'backbone', 
  'scripts/main/models/question'
  ], function($, _, Backbone, QuestionModel){
      
    var QuestionCollection = Backbone.Collection.extend({
        model : QuestionModel,
        url : QuestionModel.prototype.urlRoot,

  });

  return QuestionCollection;
});
