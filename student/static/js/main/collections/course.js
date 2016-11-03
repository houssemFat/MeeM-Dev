define([
  'jquery',
  'underscore', 
  'backbone',
  'scripts/main/models/course',
  ], function($, _, Backbone, CourseModel){

  var CourseCollection = Backbone.Collection.extend({
        /**
         * 
         */
        model : CourseModel,
        /**
         * 
         */
        url : CourseModel.prototype.urlRoot,
        
  });
  return CourseCollection;
});