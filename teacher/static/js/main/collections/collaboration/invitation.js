define([
  'jquery',
  'underscore', 
  'backbone',
  'scripts/main/models/collaboration/invitation',
  ], function($, _, Backbone, InvitationModel){

  var InvitationCollection = Backbone.Collection.extend({
        model : InvitationModel,
        url : InvitationModel.prototype.urlRoot,
        
  });
  return InvitationCollection;
});