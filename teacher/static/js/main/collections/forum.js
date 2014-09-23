define([
  'jquery',
  'underscore', 
  'backbone',
  'scripts/main/models/forum',
  ], function($, _, Backbone, ForumModel){

  var ForumCollection = Backbone.Collection.extend({
        model : ForumModel,
        url : ForumModel.prototype.urlRoot,
        
  });
  return ForumCollection;
});