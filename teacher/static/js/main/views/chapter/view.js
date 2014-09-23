
define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/main/templates/chapter/view.html',
  'assests/views/comment/main',
  ], function($, _, Backbone,  template, CommentManager) {
  return Backbone.View.extend({    
    /**
     * 
     */
    initialize: function(options) {
         this.template = _.template(template || "");
    },
    /**
     * 
     */
    events: {
    },
    /**
     * 
     */
    render: function(options) {
       this.$el.html(this.template(this.model.toJSON()));
       new CommentManager ({model_id :  this.model.get('content_type'), obj_id : this.model.get('id')});
    },
  });
});
