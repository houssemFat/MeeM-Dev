define([
  'jquery',
  'underscore', 
  'backbone', 
  'scripts/main/models/student'
  ], function($, _, Backbone, StudentModel){
  return Backbone.Collection.extend({
        model: StudentModel,
        url : StudentModel.prototype.urlRoot,
  });
});
