define([
  'jquery',
  'underscore', 
  'backbone', 
  'scripts/main/models/user'
  ], function($, _, Backbone, UserModel){
      
    var UserCollection = Backbone.Collection.extend({
        model: UserModel,
        url: __CONFIG__.baseUrl + 'user'

  });
  return UserCollection;
});
