define([
  'jquery', 
  'underscore', 
  'backbone',
  'marionette',
  'app',
  'scripts/main/views/dashboard/todo/item',
  ], function($, _, Backbone ,Marionette,
        App,
        ItemView) {
  var HitstoryListView =  Backbone.Marionette.CollectionView.extend({
        /**
        * 
        * @param {Object} options
        */
        initialize: function(options){
            this.$el = options.$el;
        },
        /**
        * 
        */
        itemView : ItemView,
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        * @param {Integer} index
        */
        appendHtml: function(collectionView, itemView, index){
            this.$el.append(itemView.$el);
        },
    });
  return HitstoryListView;
});

