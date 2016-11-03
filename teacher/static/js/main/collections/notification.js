define([
  'backbone',
  'scripts/main/models/video/document'
  ], function(Backbone, DocumentModel){

  return Backbone.Collection.extend({
    model   : DocumentModel,
    url     : DocumentModel.prototype.urlRoot,
  });
});
