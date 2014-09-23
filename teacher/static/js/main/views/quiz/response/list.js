define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'scripts/main/views/quiz/response/item',
  ], function($, _, Backbone , 
        App,
        ItemView) {
  var QuizListView =  Backbone.Marionette.CompositeView.extend({
        /**
         * 
         */
        $empty : null,
        /**
         * 
         */
        $container : null,
        /**
         * Default multiple choices
         */
        choiceType : "multiple",
        /**
        * 
        * @param {Object} options
        */
        initialize: function(options){
            this.$el = options.$el ;
            _.bindAll(this, 'changeType', 'ensureChoiceType');
            this.collection.on('question:type:change', this.changeType);
            this.collection.on('model:state:changed', this.ensureChoiceType);
            this.$el.sortable();
            this.$el.disableSelection();
            this.$el.on( "sortupdate", $.proxy(this.changeOrder, this));
            this.choiceType = options.choiceType ;
        },
        /**
         * 
         */
        changeType : function (type){
            this.choiceType = type ;
            switch (type)  {
                case 'unique':
                    // randomize a new correct answer
                    var rand = common.getRandomInt(1,this.collection.length);
                    var index= 1;
                        _.each (this.collection.models, function (item){
                            var newState = false;
                            if (index++ == rand){
                                newState = true;
                            }
                            item.view.changeInputIsTrue(newState);
                        });
                break;
            };
        },
        /**
         * garentee the choice 
         */
        ensureChoiceType : function (last){
            if (this.choiceType == "unique"){
                _.each (this.collection.models, function (item){
                        item.view.changeInputIsTrue(false);
                    });
               last.changeInputIsTrue(true);
            }
        },
        /**
         * 
         */
        changeOrder : function ( event, ui){
            event.stopImmediatePropagation ();
            var sorted = this.$el.sortable( "serialize", { key: "sort" } );
            var splitted = sorted.split('&');
            var idsByOrder = {};
            var newOrder = 0 ;
            for (var i in splitted){
                var current = splitted [i].split('=');
                idsByOrder[current[1]] = newOrder++;
            };
            _.each (this.collection.models, function (item){
                var old =  item.get('order');
                item.view.updateOrder(idsByOrder[old]);
            });
        },
        /**
         * 
         */
        addResponse : function (value){
            _.each (this.collection.models, function (item){
                if (item.get('response') === value){
                   throw new Error ('duplicate'); 
                } 
            });
            this.collection.add (new this.collection.model ({'response' : value, 'order' : this.collection.length}));
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
            this.$el.append(itemView.el);
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  return QuizListView;
});

