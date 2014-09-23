define([
  'jquery',
  'underscore', 
  'backbone',
  'scripts/main/models/user/email',
  ], function($, _, Backbone, EmailModel){
  /**
   * 
   */
  var EmailCollection = Backbone.Collection.extend({
        model : EmailModel,
        url : EmailModel.prototype.urlRoot,
        
  });
  return EmailCollection;
});