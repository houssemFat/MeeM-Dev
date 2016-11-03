define([
  'jquery',
  'underscore',
  'backbone',
  'moment',
   'text!scripts/main/templates/collaboration/task/modal.html',
  ], function($, _, Backbone, moment,
        template  ) {
  return Backbone.View.extend({
    template : _.template(template),
    $modal : null,
    inactive : function(e) {
        e.preventDefault();
        //do other stuff when a click happens
    },
    events : {  'click #confirm' : 'save', 
                'click .app-scheduler-event-color' : 'changeColor' ,'change #event_title' : 'changeTitle'},
    initialize : function (options){
        this.$el = $(this.template (this.model.toJSON()));
        this.$modal = options.$modal ;
    },
    render: function() {
            this.$modal.empty().append(this.$el).modal('show');
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
    save : function() {
            var callback = this.model.isNew() ?  'successCreate' : 'close' ;
            this.model.save({}, { data : this.model.toJSON(), success: $.proxy (this[callback], this), wait : true });
    },
    successCreate : function(response) {
        this.collection.add(this.model);
        this.close();
    },
     close : function(response) {
        this.$modal.modal('hide');
    },
    destroy: function() {
        this.model.destroy({success: this.close});
        },
    });
});