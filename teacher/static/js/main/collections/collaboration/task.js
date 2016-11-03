define([
  'backbone',
  'scripts/main/models/collaboration/task'
  ], function(Backbone, TaskModel){

  return Backbone.Collection.extend({
    model   : TaskModel,
    url     : TaskModel.prototype.urlRoot,
  });
});
