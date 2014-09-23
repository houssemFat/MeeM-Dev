define([
  'backbone',
  'scripts/main/models/collaboration/label'
  ], function(Backbone, LabelModel){

  return Backbone.Collection.extend({
    model   : LabelModel,
    url     : LabelModel.prototype.urlRoot,
  });
});
