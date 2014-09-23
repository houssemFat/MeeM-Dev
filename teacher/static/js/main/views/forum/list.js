define([
  'jquery', 
  'underscore', 
  'backbone',
  'list',
  'app',
  'text!scripts/main/templates/forum/list.html',
  'scripts/main/views/forum/item',
  ], function($, _, Backbone , ListView,
        App, 
        template,
        ItemView) {
  var ForumListView =  ListView.extend({
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
            Backbone.history.navigate('course/' + this.courseId + '/forum/create', true);
        }
    });
  return ForumListView;
});

