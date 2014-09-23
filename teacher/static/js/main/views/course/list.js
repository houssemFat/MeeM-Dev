define([
  'jquery', 
  'underscore', 
  'backbone', 
  'scripts/main/views/course/item',
  'text!scripts/main/templates/course/list.html',
  ], function($, _, Backbone, CourseItemView, template) {
  var CourseListView =  Backbone.Marionette.CompositeView.extend({
        events : {
            'click #create' : 'createNew',
        } ,
        /**
        * 
        */
        template : _.template(template),
        /**
         * 
         */
        initialize: function(){
            this.$el.html (this.template ());
        },
        /**
        * 
        */
        itemView : CourseItemView,
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        appendHtml: function(collectionView, itemView, index){
            itemView.$el.hide ();
            itemView.$el.insertBefore(this.$el.find('#add_new'));
            setTimeout (function(){
               itemView.$el.show ();
            },index * 300 );
        },
        /**
         * 
         */
        createNew : function (e){
            e.preventDefault ();
            Backbone.history.navigate('course/new', true);
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  return CourseListView;
});
