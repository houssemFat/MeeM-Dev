define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'app',
  'scripts/main/views/tour/item',
  'guiders',
  ], function($, _, Backbone , Marionette, App, ItemView, guiders) {
  var GuideListView =  Backbone.Marionette.CompositeView.extend({
      /**
       * 
       */
        el : "#guide",
        /**
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        initialize: function(options){
            this.template = _.template("");
        },
        /**
        * 
        */
        itemView : ItemView,
        /**
         * 
         */
        navigate : function (index, when){
            
        },
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        appendHtml: function(collectionView, itemView, index){
            this.$el.append(itemView.$el);
            itemView.collection = collectionView;
            itemView.index = index;
        },
        /**
         * 
         */
        clear : function (){
          _.each (this.children, function (item){
              item.remove ();
          } );
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  return GuideListView;
});

