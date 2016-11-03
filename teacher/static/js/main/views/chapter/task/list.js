define([
  'jquery', 
  'underscore', 
  'backbone',
  'list',
  'app',
  'text!scripts/main/templates/chapter/task/list.html',
  'scripts/main/views/chapter/task/item',
  ], function($, _, Backbone , ListView,
        App, 
        template,
        ItemView) {
  var QuizListView =  ListView.extend({
        /**
         *
         */
        events : {
            'click .add-new' : 'addNew',
        },
        /**
        * 
        */
        chapterId : null,
        /**
        * 
        * @param {Object} options
        */
        initialize: function(options){
            this.chapterId = options.chapterId;
            this.template = _.template(template);
        },
        
        /**
         * 
         */
        renderModel : function (){
            this.$el.html(this.template(this.getModel({ id : this.chapterId}).toJSON()));
            
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
         * @param {Event} e
         */
        addNew : function(e){
            e.preventDefault ();
            Backbone.history.navigate('chapter/' + this.chapterId + '/task/create', true);
        }
    });
  return QuizListView;
});

