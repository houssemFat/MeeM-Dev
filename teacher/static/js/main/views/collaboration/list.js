define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/collaboration/list.html',
  'text!scripts/main/templates/collaboration/typeahead.html',
  'scripts/main/views/collaboration/item',
  'scripts/main/collections/collaboration/collaboration',
  ], function($, _, Backbone , App, 
        template,
        typeaheadTemplate, 
        itemView, 
        studentListView, 
        StudentCollection) {
  var CollabListView =  Backbone.Marionette.CompositeView.extend({
        events : {
          'click #invite_by_mail' : 'InviteByEmail',
          'click #empty_invite_by_mail' : 'EmptyInviteByEmail',
        },
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        initialize: function(options){
            this.template = _.template(template);
            this.teams = options.teams;
        },
        /**
        * 
        */
        itemView : itemView,
        itemViewOptions : function (){
            return {teams : this.teams};
        },
        /**
        * 
        * @param {Object} collectionView
        * @param {Object} itemView
        */
        appendHtml: function(collectionView, itemView, index){
            this.$container.append(itemView.el);
        },
        $empty : null,
        $container : null,
        /**
         * 
         */
        renderModel : function (){
            this.$el.html(this.template());
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
        autoClick : function (object){
            Backbone.history.navigate('collaboration/' + object.id, true);
        },
        /**
         * 
         */
        EmptyInviteByEmail : function (e){
            e.preventDefault ();
            var $value = this.$el.find('#add_collaboration_mail');
            var list = [];
            var email = $value.val() ;
            if ((email!== "") && common.isEmail(email))
                list.push(email);
            this.InviteByEmail (e, list);
        },
        /**
         * 
         */
        InviteByEmail : function (e, list){
            e.preventDefault ();
            require (['scripts/main/views/collaboration/invitation/invite'], function (InvitationView){
                new  InvitationView ({model : App.User, list : list});
            });
        },
        /**
         * 
         */
        close : function (){
            this.remove ();
        }
    });
  return CollabListView;
});

