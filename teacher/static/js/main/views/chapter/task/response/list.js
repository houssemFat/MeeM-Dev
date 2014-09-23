define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'scripts/main/views/quiz/response/item',
  ], function($, _, Backbone , 
        App,
        ItemView) {
  var QuizListView =  Backbone.Marionette.CompositeView.extend({
        /**
         * 
         */
        $empty : null,
        /**
         * 
         */
        $container : null,
        /**
        * 
        * @param {Object} options
        */
        initialize: function(options){
            this.chapterId = options.chapterId;
            this.$el = options.$el ;
        },
        
        /**
         * 
         */
        renderModel : function (){
            
            this.$empty = this.$el.find("#list_empty");
            this.$container = this.$el.find("#list_view");
            _.bindAll(this, 'showList');
            this.collection.bind('add', this.showList);
            if (this.collection.length === 0){
                this.$container.hide ();
                this.$empty.show ();
            }
        },
        /**
         * 
         */
        showList : function (){
            this.$container.show ();
            this.$empty.hide ();
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
        appendHtml: function(collectionView, itemView, index){
            this.$container.append(itemView.el);
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  return QuizListView;
});

