define([
  'jquery', 
  'underscore', 
  'backbone',
  ], function($, _, Backbone) {
  var ItemView =  Backbone.Marionette.View.extend({
        className : 'row',
        /**
        * 
        */
        template : _.template('<li><div class="col-lg-8 text-left"><%=common.truncateString (title, 25, "..") %></div><div class="col-lg-4"><label class="label app-hand label-default" id="on">Oui</label><label class="label  app-hand label-danger" id="off">Non</label></div>'),
        /**
         * 
         */
        events : {
          'click #on' : 'selectMe',
          'click #off' : 'deselectMe',  
        },
        initialize: function() {
        },
        /**
         * 
         */
        render: function() {
           this.$el.html(this.template(_.extend(this.model.toJSON())));
           return this;
        },
        /**
         * 
         */
        selectMe : function (e){
            this.$el.find('label#on').removeClass('label-default').addClass('label-success');
            this.$el.find('label#off').removeClass('label-danger').addClass('label-default');
            e.stopImmediatePropagation();
        },
        /**
         * 
         */
        deselectMe : function (e){
            this.$el.find('label#on').removeClass('label-success').addClass('label-default');
            this.$el.find('label#off').addClass('label-danger').removeClass('label-default');
           e.stopImmediatePropagation();
        },
    });
  var CourseListView =  Backbone.Marionette.CompositeView.extend({
        /**
        * 
        */
        template : _.template(""),
        /**
         * 
         */
        className : '',
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        initialize: function(options){
            this.$el = options.$container ;
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
  return CourseListView;
});
