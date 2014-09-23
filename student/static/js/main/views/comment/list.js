define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!scripts/main/templates/comment/item.html',
  ], function($, _, Backbone, template) {
  var CommentListView =  Backbone.Marionette.CompositeView.extend({
        /**
         * 
         */
        template : _.template (template),
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        initialize: function(options, other, otherp){
            this.$el.html (this.template(this.model.toJSON()));
            //this.collection = this.model.get('comments');
            this.collection = this.model.comments;
        },
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        appendHtml: function(collectionView, itemView){
            var $el = collectionView.$el,
                 $container = $el.find ('#list_comment_view:eq(0)') ;
            if (!$container[0]){
                $el.find( "#compose:eq(0)" ).before('<div id="list_comment_view"></div>');
            }
            $el.find ('#list_comment_view:eq(0)').append(itemView.el);
        },
        /**
         * 
         */
        close : function (){
            this.remove ();   
        }
    });
  return CommentListView;
});
