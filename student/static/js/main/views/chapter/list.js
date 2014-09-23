define([
  'jquery', 
  'underscore', 
  'backbone', 
  'scripts/main/views/chapter/item',
  ], function($, _, Backbone, ChapterItemView) {
  var CourseListView = Backbone.View.extend({
    /**
     * 
     */
    events: {
           
    },
    /**
     * 
     * @param {Object} options
     */
    initialize: function(options) {
        this.$el = options.$container.find('#chapter_list');
        this.render ();
    },
    /**
     * 
     */
    render: function() {
        this.collection.each(this.renderItem, this);
    },
    /**
     * 
     * @param {Object} model
     */
    renderItem : function(model) {
        var itemView = new ChapterItemView({model:model});
        itemView.render ();
        this.$el.append(itemView.$el);
    },
  });
  return CourseListView;
});
