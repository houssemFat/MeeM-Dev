// FileName : --
// created : --
define([
  'jquery',
  'underscore',
  'backbone',
  'scripts/main/models/document'
  ], function($, _, Backbone, DocumentModel){

  return Backbone.Collection.extend({
     model: DocumentModel,
     url : DocumentModel.prototype.urlRoot,
  });
});
