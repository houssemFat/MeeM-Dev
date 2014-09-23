define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/collaboration/scheduler_team_list.html',
  'scripts/main/views/collaboration/team',
  'scripts/main/collections/collaboration',
  ], function($, _, Backbone , App, 
        template,
        typeaheadTemplate, 
        itemView, 
        studentListView, 
        StudentCollection) {
  var TeamListView =  Backbone.Marionette.CompositeView.extend({
        events : {
            
        },
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        initialize: function(options){
            this.template = _.template(template)(options.data);
        },
        /**
        * 
        */
        itemView : itemView,
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        appendHtml: function(collectionView, itemView, index){
            this.$el.find('#collaboration_list').append(itemView.el);
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  return TeamListView;
});

