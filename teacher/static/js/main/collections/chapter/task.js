define([
  'backbone',
  'scripts/main/models/chapter/task'
  ], function(Backbone, TaskModel){

  return Backbone.Collection.extend({
    model   : TaskModel,
    url     : TaskModel.prototype.urlRoot,
  });
});
