define([
  'backbone',
  'scripts/main/models/video/video'
  ], function(Backbone, VideoModel){

  return Backbone.Collection.extend({
    model   : VideoModel,
    url     : VideoModel.prototype.urlRoot,
  });
});
