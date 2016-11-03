define([
  'jquery', 
  'underscore', 
  'backbone', 
  'scripts/main/views/question/item',
  ], function($, _, Backbone, QuestionItemView) {
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
        this.$el = options.$container.find('#question_list');
        this.$insider = options.$container.find('#player_progress_bg'); 
        //this.render ();
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
        var itemView = new QuestionItemView({model:model});
        itemView.render ();
        this.$insider.append(itemView.$icon);
        this.$el.append(itemView.$el);
        this.children.push (itemView);
    },
    /**
     * 
     * @param {Object} percent
     */
    checkQuestions : function (percent){
        var continue_ = false,
            index = 0 ;
        for (; (index < this.children.length) && !continue_; index++ ){
            continue_ = this.children[index].verify (percent);
        };
    },
  });
  return QuestionListView;
});
