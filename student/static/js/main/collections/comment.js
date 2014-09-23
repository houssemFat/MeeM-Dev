define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone){
    
TreeNode = Backbone.Model.extend({
    initialize: function(){
        var comments = this.get("comments");
        if (comments){
            this.comments = new TreeNodeCollection(comments);
            //this.unset("comments");
        }
    }        
});

TreeNodeCollection = Backbone.Collection.extend({
    model: TreeNode
});
/*
  var CommentCollection = Backbone.Collection.extend({
    model: CommentModel,
    url: 'jsc/comment',
    chapterId : null ,
    initialize : function (options, extra){
        this.chapterId = extra.id ;
    }
  });
  var CommentModel = Backbone.Model.extend({
        urlRoot : __CONFIG__.getBaseUrl () +  '/comment',
        chapterId : null,
        url : function (){return this.urlRoot + '/' + this.chapterId + (this.id ? ('/' + this.id) : '')  ;},
        initialize : function (options){
            this.chapterId = this.collection.chapterId ;
            var comments = this.get("comments");
            if (comments){
                this.comments = new CommentCollection(comments);
                this.unset("comments");
            }
        },
    });*/
  return TreeNodeCollection;
});
