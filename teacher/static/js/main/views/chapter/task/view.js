define([
  'jquery',
  'underscore',
  'backbone',
  'scripts/main/collections/quiz/response',
  'scripts/main/views/quiz/response/list',
  'text!scripts/main/templates/quiz/view.html',
  'appModal',
  ], function($, _, Backbone, ResponseCollection, 
      ResponseListView, template, ModalView) {
  return Backbone.View.extend({   
    /**
     * 
     */
    template : _.template(template || ""),
    /**
     * 
     */
    initialize: function(options) {
         this.$el.html (this.template(this.model.toJSON()));
         this.on('view:addSuggession', this.addSuggession);
         this.on('view:readyView', this.modalReadyView);
         this.collection = options.collection ;
         this.render ();
    },
    /**
     * 
     */
    render: function() {
      var modalView = new ModalView({
            scope  : this, 
            header : 'Question',
            ok :  'Enregistrer',
            dismiss : 'Fermer',
            body   : this.$el.html(),
            events : {
                'click #new' : 'addSuggession'
            },
        });
        modalView.render ();
        
    },
    /**
     * 
    * @param {Object} id
    * @param {Object} object
     */
    addSuggession : function (ev, $content){
        ev.preventDefault ();
        this.responseListView.addItem ();
    },
    /**
     * 
    * @param {Object} id
    * @param {Object} object
     */
    close : function (){
        this.remove ();
    },  
    /**
     * 
     */
    modalReadyView : function ($content){
        this.responseListView = new ResponseListView (
            { collection : new ResponseCollection(this.collection), $container : $content}
            );

    },
  });
});
