define([
  'jquery',
  'underscore', 
  'backbone',
  'scripts/main/models/student',
  ], function($, _, Backbone, StudentModel){

  var StudentCollection = Backbone.Collection.extend({
        model : StudentModel,
        url : StudentModel.prototype.urlRoot,
        
  });
  return StudentCollection;
});