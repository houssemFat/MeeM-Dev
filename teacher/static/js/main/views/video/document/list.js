define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'scripts/main/views/video/document/item',
  ], function($,
         _, 
        Backbone , 
        App, 
        itemView) {
  var VideoListView =  Backbone.Marionette.CompositeView.extend({
        /**
        * 
        * @param {Object} options
        */
        initialize: function(options){
            this.$el = options.$el ;
        },
        
        /**
         * 
         */
        renderModel : function (){
        },
        /**
        * 
        */
        itemView : itemView,
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        appendHtml: function(collectionView, itemView, index){
            this.$el.append(itemView.el);
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  return VideoListView;
});

