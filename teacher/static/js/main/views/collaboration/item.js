define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'scripts/main/views/collaboration/teamList',
  'scripts/main/collections/collaboration/team',
  'text!scripts/main/templates/collaboration/item.html',
  ], function($, _, Backbone, App, TeamListView, TeamCollection, template)  {

  return Backbone.Marionette.ItemView.extend({
      events  : {
            'click #task' : 'viewSchedular',  
      },
        /**
         * 
         */
        initialize: function(options) {
             this.teams = options.teams;
             this.template = _.template(template);
            _.bindAll(this, "select");
             
        },
        /**
         * 
         */
        onRender : function() {
           var myteams = this.model.get('teams');
           var collection = new TeamCollection (this.teams);
           _.each (collection.models, function (model){
               var id = model.get('id');
               selected = false ;
               if (myteams.lastIndexOf(id) > - 1 ){
                   selected = true ;
               }
               model._silentSet ({'selected': selected});
           });
           var teamListView = new TeamListView ({collection : collection, parent : this, $el : this.$el.find('#team_list')});
           teamListView.render ();
           this.teamListView = teamListView ;
           this.collection = collection;
           this.teamListView.bind('view:selected', this.select);
           this.model.view = this;
           return this;
        },
        /**
         * 
         */
        select : function (view){
            var url =  (( !view.model.get ('selected') ) ? '/join' : '/quit');
            $.post (this.model.url (url, 'teams/' ),
                    common.django.appendcsrf({member_id : this.model.get ('id'), team_id : view.model.get ('id')}),
                    $.proxy (this.updateTeams, this, view)
               );
        },
        /**
         * 
         */
        viewSchedular : function (event){
            event.preventDefault ();
            Backbone.history.navigate('collaboration/tasks/user/' + this.model.get('id'), true);
        },
        /**
         * 
         */
        updateTeams : function(view, response) {
            view.model.set ({'selected' : response.changed}, {silent  : false});
         },
        /**
         * 
         */
        close : function() {
            this.remove ();
        },
  });
});
