define([
  'jquery',
  'underscore',
  'backbone',
  'scripts/main/models/course/syllabus'
  ], function($, _, Backbone, SylabusModel){

  return Backbone.Collection.extend({
        model : SylabusModel,
        url : SylabusModel.prototype.urlRoot,
  });
});
