define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'list',
  'text!scripts/main/templates/classroom/list.html',
  'text!scripts/main/templates/classroom/typeahead.html',
  'scripts/main/views/classroom/item',
  'scripts/main/views/classroom/students',
  'scripts/main/collections/classroom',
  ], function($, _, Backbone , 
        App,
        List, 
        template,
        typeaheadTemplate, 
        itemView, 
        studentListView, 
        StudentCollection) {
  var ClassroomListView =  List.extend({
        /**
         * 
         */
        events : {
          'click #invite_by_mail' : 'InviteByEmail',  
        },
        /**
        * 
        */
        nameClass : 'app-t-student-item-name-',
        /**
        * 
        */
        courseId : null,
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
        renderModel : function () {
            this.$el.html (this.template(this.options.data));
            this.$empty = this.$el.find("#list_empty");
            this.$container = this.$el.find("#list_view");
            if (this.collection.length === 0){
                this.$container.hide ();
                this.$empty.show ();
            }  
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
            itemView.$el.find('.app-t-student-item-name')
            .addClass( collectionView.nameClass +((index % 2 === 0) ? 'odd' : 'even'));
            this.$container.append(itemView.el);
        },
        /**
         * 
         */
        onShow : function (){
            /* */
            common.autoComplete (
                this.$el.find('input')[0], 
                {
                    dataType : 'json' , 
                    'url' : this.collection.model.prototype.urlRoot + '/search',
                    getItem : function (object){
                        return { template : _.template (typeaheadTemplate)(object), value : object.username};
                    },
                    animate : true,
                    click : this.autoClick,
                    scope : this,
                    data : {'cid' : this.courseId },
                    onRender : this.onAutoRender
                });
        },
        /**
         * 
         */
        autoClick : function (object){
            Backbone.history.navigate('classroom/' + object.id, true);
        },
        /**
         * 
         */
        onAutoRender : function ($objects){
            // list of list item with model attached
            $objects.find('.invite-me').click(function (event){
                // get dom object parent
                var id = $(this).parent()[0].model.id;
                alert (id); 
                event.stopImmediatePropagation ();
            });
        },
        /**
         * 
         */
        InviteByEmail : function (e){
            e.preventDefault ();
            var scope = this ;
            require (['scripts/main/views/classroom/invite'], function (InvitationView){
                new  InvitationView ({model : App.User, courseId : scope.courseId, username : App.username});
            });
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  return ClassroomListView;
});

