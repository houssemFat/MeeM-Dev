define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'list',
  'text!scripts/main/templates/quiz/question/list.html',
  'scripts/main/views/quiz/question/item',
  'scripts/main/models/quiz/question',
  ], function($, _, Backbone , 
        App,
        List,
        template,
        ItemView,
        Model) {
  var QuestionListView =  List.extend({
      /**
       * 
       */
        itemView  : ItemView ,
        /**
         *
         */
        events : {
            'click .add-new' : 'addNew',
        },
        /**
         * 
         */
        template :_.template(template),
        /**
        * 
        * @param {Object} options
        */
        initialize: function(options){
            if (options.$el){
                this.$el = options.$el;
            }
            this.on('dom:ready', this.domReady);
        },
        /**
         * 
         */
        addNew : function (){
            this.collection.add(new Model ({quiz_id : this.model.get('id'), 'order' : this.collection.length}));          //this.addChildView (new ItemView ({model :}));  
        },
        
        /**
         * 
         */
        domReady : function (){
            this.$container.sortable();
            this.$container.disableSelection();
            this.$container.on( "sortupdate", $.proxy(this.changeOrder, this));
        },
        /**
         * 
         */
        changeOrder : function ( event, ui){
            var sorted = this.$container.sortable( "serialize", { key: "sort" } );
            alert (sorted);
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  return QuestionListView;
});

