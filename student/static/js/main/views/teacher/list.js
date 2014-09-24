define([
  'jquery', 
  'underscore', 
  'backbone', 
  'scripts/main/views/teacher/item',
  ], function($, _, Backbone, ProfessorItemView) {
  var ProfessorListView = Backbone.View.extend({
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
        this.$el = options.$container.find('#teacher_body');
        this.render ();
    },
    /**
     * 
     */
    render: function() {
        this.$el.empty();
        this.collection.each(this.renderItem, this);
    },
    /**
     * 
     * @param {Object} model
     */
    renderItem: function(model) {
          var itemView = new StudentItemView({model:model});
          itemView.render ();
          this.$el.append(itemView.el);
    },
  });
  return ProfessorListView;
});
