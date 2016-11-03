define([
  'jquery', 
  'underscore', 
  'backbone',
  'list',
  'app',
  'text!scripts/main/templates/video/list.html',
  'scripts/main/views/video/item',
  'scripts/main/collections/video/video',
  ], function($, _, Backbone , ListView,
        App, 
        template,
        itemView,
        videoCollection) {
  var VideoListView =  ListView.extend({
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
            this.$el.html(this.template(this.getModel ({ id : this.chapterId }).toJSON()));
        },
        /**
        * 
        */
        itemView : itemView,
        /**
         * 
         * @param {Event} e
         */
        addNew : function(e){
            e.preventDefault ();
            Backbone.history.navigate('chapter/' + this.chapterId + '/video/create', true);
        },
        /**
         * 
         */
        close : function (){
            this.undelegateEvents ();
            this.remove ();
        }
    });
  return VideoListView;
});

