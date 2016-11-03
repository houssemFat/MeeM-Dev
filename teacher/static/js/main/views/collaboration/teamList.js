define(['jquery', 'underscore', 'backbone', 'app', 'scripts/main/views/collaboration/teamItem'], function($, _, Backbone, App, ItemView) {
    var CollabListView = Backbone.Marionette.CompositeView.extend({
        /**
         *
         * @param {Object} collectionView
         * @param {Object} itemView
         */
        initialize : function(options) {
            this.template = _.template("");
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
        appendHtml : function(collectionView, itemView, index) {
            itemView.collection = this.collection ;
            this.$el.append(itemView.el);
            itemView.listView = this;
        },
        /**
         *
         */
        close : function() {
            this.remove();
        }
    });
    return CollabListView;
});
