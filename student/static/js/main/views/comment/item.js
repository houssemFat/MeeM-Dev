define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!scripts/main/templates/comment/item.html',
  'scripts/main/collections/comment',
  ], function ($, _, Backbone, template, ListCommentCollection) {
  var CommentItemView = Backbone.View.extend ({

    /*tagName : 'span',*/

    template : _.template(template),

    events : {
      'keyup #content'   : 'keyup',
      'click #submit' : 'send',
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    /**
     * 
     */
    keyup : function (e){
        if (e.keyCode === 13) /*enter*/
            this.send ();
    },
    /**
     * 
     * @param {Object} e
     */
    send : function (e){
        var value = this.$el.find('textarea').val (),
            id = this.model.collection.chapterId ;
        this.model.collection.create({}, {
            wait: true, 
            'success' : this.success, 
            silent: true, 
            data : _.extend(
                    {
                        value: value, 
                        parent : id
                    }, 
                    {
                        'ajax' : true, 
                        YII_CSRF_TOKEN : __CONFIG__.yii_csrf 
                    }
               )
            });    
    },
    /**
     * 
     */
    success : function (){
        alert ('response');
    }
  });
  return CommentItemView;
});
