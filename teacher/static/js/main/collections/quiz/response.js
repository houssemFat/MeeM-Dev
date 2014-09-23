define([
  'jquery',
  'underscore', 
  'backbone',
  'scripts/main/models/quiz/response',
  ], function($, _, Backbone, ResponseModel){

  var ResponseCollection = Backbone.Collection.extend({
        model : ResponseModel,
        url : ResponseModel.prototype.urlRoot,
        
  });
  return ResponseCollection;
});