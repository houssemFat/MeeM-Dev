// Filename: models/comment
define([
    'underscore',
    'backbone',
    'scripts/main/collections/comment'
    ], function (_, Backbone, CommentCollection) {
    var CommentModel = Backbone.Model.extend({
         urlRoot : '/j/comment',
         url : function (url){return this.urlRoot + ( this.id ? ('/' + this.id ): '') + ( url ? ('/' + url ): '') ;},
        /**
         * 
         */
        defaults : {
            up : '80',
            down : '20'
        },
        /**
         * 
        * @param {Object} options
         */
       initialize : function (options){
            //this.chapterId = this.collection.chapterId ;
            var comments = this.get("comments");
            if (comments){
                this.comments = new CommentCollection(comments);
                this.unset("comments");
            }
        },
    });
    return CommentModel ;
});