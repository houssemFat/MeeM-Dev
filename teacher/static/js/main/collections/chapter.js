define([
  'jquery',
  'underscore',
  'backbone',
  'scripts/main/models/chapter'
  ], function($, _, Backbone, ChapterModel){

  return Backbone.Collection.extend({
        model: ChapterModel,
        url : ChapterModel.prototype.urlRoot,
  });
});
