define([
  'jquery', 
  'underscore', 
  'backbone',
  'marionette',
  'app',
  'scripts/main/views/settings/emails/item',
  ], function($, _, Backbone , Marionette,
        App,
        ItemView) {
  var EmailsListView =  Backbone.Marionette.CompositeView.extend({
        /**
        * 
        */
        chapterId : null,
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
        */
        appendHtml: function(collectionView, itemView, index){
            this.$el.append(itemView.el);
        },
    });
  return EmailsListView;
});

