define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/collaboration/team/list.html',
  'text!scripts/main/templates/collaboration/typeahead.html',
  'scripts/main/views/collaboration/team/item'
  ], function($, _, Backbone , App, 
        template,
        typeaheadTemplate, 
        ItemView) {
  return  Backbone.Marionette.CompositeView.extend({
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
         */
        $empty : null,
        /**
         * 
         */
        $container : null,
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        initialize: function(options){
            this.template = _.template (template);
            this.courseId = options.courseId ;
        },
        /**
         * 
         */
        renderModel : function (){
            this.$el.html(this.template({ id : this.courseId }));
            this.$empty = this.$el.find("#list_empty");
            this.$container = this.$el.find("#list_view");
            if (this.collection.length === 0){
                this.$container.hide ();
                this.$empty.show ();
            }
            else {
                this.$container.show ();
                this.$empty.hide ();
            }
            /* toggle search  */
            $('[data-command="toggle-search"]', this.$el[0]).on('click', function(event) {
                event.preventDefault();
                $(this).toggleClass('hide-search');
                if ($(this).hasClass('hide-search')) {        
                    $('.c-search').closest('.row').slideUp(100);
                }else{   
                    $('.c-search').closest('.row').slideDown(100);
                }
            });
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
            this.$container.append(itemView.$el);
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
});

