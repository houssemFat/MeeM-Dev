define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/inbox/list.html',
  'text!scripts/main/templates/inbox/typeahead.html',
  'scripts/main/views/inbox/item',
  'scripts/main/collections/inbox',
  ], function($, _, Backbone , App, 
        template,
        typeaheadTemplate, 
        itemView,
        inboxCollection) {
  var InobxListView =  Backbone.Marionette.CompositeView.extend({
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        initialize: function(options){
            this.template = _.template(template)();
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
            this.$el.find("#inbox_list_view").append(itemView.el);
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  return InobxListView;
});

