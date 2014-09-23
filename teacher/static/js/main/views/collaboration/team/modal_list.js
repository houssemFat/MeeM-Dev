define([
  'jquery',
  'underscore',
  'backbone',
  'moment',
   'text!scripts/main/templates/collaboration/task.html',
  ], function($, _, Backbone, moment,
        template  ) {
  return Backbone.View.extend({
        template : _.template(template),
        $modal : null,
        events : {  'click #confirm' : 'save', 
                    'click .app-scheduler-event-color' : 'changeColor' ,'change #event_title' : 'changeTitle'},
        initialize : function (options){
            this.$el = $(this.template (this.model.toJSON()));
            this.$modal = options.$modal ;
            if (this.model.isNew()){
                this.$el.find('#team_tab').removeAttr('data-toggle').attr('href', '#').disabled();
            }
            else {
                
            }
        },
        render: function() {
            this.$modal.empty ().append(this.$el).modal();
            return this;
        },
        changeColor : function (event){
            var color  = '#' + $(event.currentTarget).attr('data-color');
            // the tag used is <i>
            this.$el.find ("#my_label").css( {'color' : color });
            this.model._silentSet({'color': color} );
        },
        changeTitle : function (event){
            var title  = $(event.currentTarget).val();
            this.model._silentSet({'title': title} );
        },
        save: function() {
            this.model._silentSet({'created_at': moment().unix()} );
            if (this.model.isNew()) {
                this.model.save({},
                                
                                {
                                    data : this.model.toJSON(),
                                    success : $.proxy(this.successCreate,this),
                                    wait : true
                                }
                                );
                //
            } else {
                this.model.save({}, {success: this.close});
            }
        },
     successCreate : function(response) {
        this.collection.add(this.model);
        this.$modal.modal('hide');
    },
        destroy: function() {
            this.model.destroy({success: this.close});
        },
    });
});