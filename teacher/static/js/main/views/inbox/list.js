define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'list',
  'text!scripts/main/templates/inbox/list.html',
  'text!scripts/main/templates/inbox/typeahead.html',
  'scripts/main/views/inbox/item',
  'scripts/main/collections/inbox',
  ], function($, _, Backbone , App, ListView,
        template,
        typeaheadTemplate, 
        itemView,
        inboxCollection) {
  var InobxListView =  ListView.extend({
        /**
         *
         */
        template : _.template(template || ""),
        /**
         * 
         */
        serverData : function (){
            return _.extend (this.serverOptions);
        },
        /**
        * 
        */
        itemView : itemView,
        /**
         *
         */
        renderModel : function() {
            this.$el.html(this.template(this.getModel().toJSON()));
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  return InobxListView;
});

