define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'scripts/main/views/course/item',
  'text!scripts/main/templates/course/list.html',
  ], function($, _, Backbone, App, CourseItemView , template) {
  var CourseListView = Backbone.View.extend({
    el : '#courses',
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
        this.template = _.template(template);
        this.$el.html(this.template());
        if (!App.isAuthenticated)
            this.$el.insertAfter('section#login');
        this.render ();
    },
    /**
     * 
     */
    render: function() {
         this.$el.find('#course_list').empty();
        this.collection.each(this.renderItem, this);
    },
    /**
     * 
     * @param {Object} model
     */
    renderItem: function(model) {
          var itemView = new CourseItemView({model:model});
          itemView.render ();
          this.$el.find('#course_list').append(itemView.el);
    },
  });
  return CourseListView;
});
