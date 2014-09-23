define([
  'jquery', 
  'underscore', 
  'backbone',
  'scripts/main/views/classroom/student'
  ], function($, _, Backbone , itemView) {
  var myCollaboratorsListView =  Backbone.Marionette.CompositeView.extend({
            /**
            * @param {Object} collectionView
            * @param {Object} itemView
            */
        initialize: function(options){
            this.$el = options.el ;
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
        appendHtml: function(collectionView, itemView){
            this.$el.append(itemView.el);
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  return myCollaboratorsListView;
});

