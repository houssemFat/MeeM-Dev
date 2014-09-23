define([
  'jquery', 
  'underscore', 
  'backbone', 
  'scripts/main/views/student/item',
  ], function($, _, Backbone, CourseItemView/*, template*/) {
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
        this.$el = options.$container.find('#students_body');
        this.render ();
    },

    render: function() {
        this.$el.empty();
        this.collection.each(this.renderItem, this);
    },
    /**
     * 
     * @param {Object} model
     */
    renderItem: function(model) {
          var itemView = new CourseItemView({model:model});
          itemView.render ();
          this.$el.append(itemView.el);
    },
  });
  return CourseListView;
});
