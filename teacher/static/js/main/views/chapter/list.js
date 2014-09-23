define(['jquery', 'underscore', 'app', 'list', 'text!scripts/main/templates/chapter/list.html', 'scripts/main/views/chapter/item', 'scripts/main/collections/chapter'], function($, _, App, ListView, template, ItemView, ChapterCollection) {
    return ListView.extend({
        events : {
            'click .add-new' : 'addNew'
        },
        /**
         *
         */
        template : _.template(template || ""),
        /**
         *
         */
        courseId : null,
        /**
         *
         * @param {Object} collectionView
         * @param {Object} itemView
         */
        initialize : function(options) {
            this.courseId = options.courseId;
        },
        /**
         * 
         */
        serverData : function (){
            return _.extend (this.serverOptions, {cid : this.courseId});
        },
        /**
         *
         */
        renderModel : function() {
            this.$el.html(this.template(this.getModel({ id : this.courseId}).toJSON()));
        },
        /**
         *
         */
        itemView : ItemView,
        /**
         * 
         * @param {Event} e
         */
        addNew : function(e){
            e.preventDefault ();
            Backbone.history.navigate('chapter/' + this.courseId + '/new', true);
        },
        /**
         *
         */
        close : function() {
            this.remove();
        }
    });
});

