define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'appModal',
  'text!scripts/teacher/templates/tools/item.html',
  'jqueryUI'
  ], function($, _, Backbone, App, ModalView, template) {
  return Backbone.View.extend({
      /**
       * 
       */
    template : _.template (template),
    /**
     * 
     */
    initialize: function(options) {
          this.$el.html ("");
         this.on('view:selectMe', this.selectMe);
         //this.model.on('view:confirm', this.confirmCreate);
         this.render ();
         //this.model.view = this ;
    },
    /**
     * 
     */
    render: function() {
        var scope = this ;
      _.each (this.collection, function(item){
          scope.$el.append (scope.template(item));
      });
      var modalConfirmView = new ModalView({
            header : 'Choisir l\'outil à intégrer dans le cours',
            dismiss : 'fermer',
            scope  : this, 
            body   :  this.$el.html(),
            events : {
                'click .select' : 'selectMe',
            },
            type : 'info'
        });
        this.$el.append($('<div class="clearfix"></div>'));
        modalConfirmView.render ();
        this.modalChoicesView = modalConfirmView ;
    },
    /**
     * 
     */
     modalReadyView : function ($content){
         
     },
     /**
      * 
      * @param {Object} e
      */
     selectMe : function (e){
        e.preventDefault();
        var id = $(e.currentTarget).attr('id');
        this.modalChoicesView.close () ;
        Backbone.history.navigate('tools/' + id, true);
     },
  });
});