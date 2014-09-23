define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'assests/models/comment',
  'assests/views/comment/item',
  'text!assests/templates/comment/list.html',
  ], function($, _, 
        Backbone , 
        App,
        Model,
        ItemView,
        template) {
  var CommentCollection = Backbone.Collection.extend({
        /**
         * 
         */
        model : Model,
        /**
         * 
         */
        url : function (model_id, object_id){
            return Model.prototype.urlRoot() + model_id  + '/' +  object_id + '/list';
        },
        
  });
  
  var CommentListView =  Backbone.Marionette.CompositeView.extend({
      /**
       * 
       */
        template : _.template (template),
        /**
         *
         */
        events : {
            'click #comment' : 'comment',
        },
        /**
        * 
        */
        chapterId : null,
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
         */
        $container : null,
        /**
         * 
         */
        $spinner : null,
        /**
         * 
         */
        $submit : null,
        /**
         * 
         */
        $commentValue : null,
        /**
        * 
        * @param {Object} options
        */
        initialize: function(options){
            
        },
        /**
         * 
         */
        renderModel : function (){
            this.$el.html (this.template());
            this.$empty = this.$el.find("#list_empty");
            this.$container = this.$el.find("#list_view");
            this.$commentValue = this.$el.find("#comment_value");
            this.$spinner = this.$el.find("#spinner");
            this.$submit = this.$el.find("#comment");
            if (this.collection.length === 0){
                this.$container.hide ();
                this.$empty.show ();
            }
            var $appendTo = this.options.$el ;
            if (!$appendTo)
                $appendTo = $('#comments_view');
            this.$el.appendTo ($appendTo);
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
        appendHtml : function(collectionView, itemView, index){
            this.$container.append(itemView.el);
        },
        /**
         * Create a new comment
         * @param {Event} e
         */
        comment : function(e){
            e.preventDefault ();
            var comment = this.$commentValue.val() ;
            if (!comment.length)
                return ;
            var model = new Model ({model_id : this.options.model_id, obj_id : this.options.obj_id, comment :  comment});
            this.$submit.hide ();
            this.$spinner.show ();
            model.save({}, {
                data : model.toJSON(),
                success : $.proxy(this.successComment, this),
                error : $.proxy(this.errorComment, this),
                wait : true
            });
        },
        /**
         * 
         */
        successComment  : function (model, response){
            this.collection.add (model);
            this.$commentValue.empty ();
            this.$spinner.hide ();
            this.$submit.show ();
        },
        /**
         * 
         */
        errorComment  : function (model, response){
            this.$spinner.hide ();
            this.$submit.show ();
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  var CommentManager = Backbone.View.extend({
      initialize : function(options){
            var collection = new CommentCollection();
            $.when(
                collection.fetch(
                    {url : collection.url (options.model_id, options.obj_id)  }
                )
            ).done(
            function (response){
                (new CommentListView (_.extend ({}, options, {collection : collection}))).render();
                }
            );
            
     },
  });
  return CommentManager;
});

