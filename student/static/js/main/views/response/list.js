define([
  'jquery', 
  'underscore', 
  'backbone', 
  'scripts/main/views/response/item',
  ], function($, _, Backbone, ResponseItemView) {
  var QuestionListView = Backbone.View.extend({
    /**
     * 
     */
    events: {
           
    },
    
    /**
     * 
     */
    children : [],
    /**
     * 
     * @param {Object} options
     */
    initialize: function(options) {
        this.$el = options.$container.find('#response_list');
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
        var itemView = new ResponseItemView({model:model});
        itemView.render ();
        this.$el.append(itemView.$el);
    },
  });
  return QuestionListView;
});
