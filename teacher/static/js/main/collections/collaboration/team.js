define([
  'jquery',
  'underscore', 
  'backbone',
  'scripts/main/models/collaboration/team',
  ], function($, _, Backbone, TeamModel){

  var TeamCollection = Backbone.Collection.extend({
        model : TeamModel,
        url : TeamModel.prototype.urlRoot,
        
  });
  return TeamCollection;
});