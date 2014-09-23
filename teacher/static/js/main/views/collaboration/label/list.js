define(['jquery', 'underscore', 'marionette', 'scripts/main/views/collaboration/label/item'], function($, _, Marionette, ItemView) {
    return Backbone.Marionette.CompositeView.extend({
        /**
         * 
         */
        itemView : ItemView,
        /**
         *
         * @param {Object}
         */
        initialize : function(options) {
            this.$el = options.$el;
            /*_.bindAll(this, "addOne", "change");
             this.collection.bind('reset', this.addAll);
             this.collection.bind('add', this.addOne);
             this.collection.bind('change', this.change);*/
        },
        /**
         *
         */
        close : function() {
            this.remove();
        }
    });
});
