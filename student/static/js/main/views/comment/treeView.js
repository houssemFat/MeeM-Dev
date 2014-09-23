define([
  'jquery', 
  'underscore', 
  'backbone', 
  'scripts/main/views/comment/list',
  ], function($, _, Backbone, ListView) {
  var TreeRoot =  Backbone.Marionette.CollectionView.extend({
       itemView : ListView
    });
  return TreeRoot;
});
