define([
  'jquery', 
  'underscore', 
  'backbone', 
  'scripts/main/views/forum/list',
  ], function($, _, Backbone, ListView) {
  var TreeRoot =  Backbone.Marionette.CollectionView.extend({
       /**
        * 
        */
       itemView : ListView,
       /**
        * 
        */
       tagName : 'div',
       /**
        * 
        */
       initialize : function (options){
           this.$el = options.$el ;
           this.options = options ;
           this.editor = options.editor;
       },
       /**
        * 
        */
       itemViewOptions : function(model, index) {
        // do some calculations based on the model
            return {'_editor' :  this.editor };
        },
    });
  return TreeRoot;
});
