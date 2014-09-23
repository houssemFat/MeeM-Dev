define([
  'backbone',
  'scripts/main/models/course'
  ], function(Backbone, CourseModel){

  return Backbone.Collection.extend({
    model: CourseModel,
    url : CourseModel.prototype.urlRoot,
  });
});
