define([
  'jquery',
  'underscore', 
  'backbone',
  'scripts/main/models/professor',
  ], function($, _, Backbone, ProfessorModel){

  var ProfessorCollection = Backbone.Collection.extend({
        model : ProfessorModel,
        url : ProfessorModel.prototype.urlRoot,
        
  });
  return ProfessorCollection;
});