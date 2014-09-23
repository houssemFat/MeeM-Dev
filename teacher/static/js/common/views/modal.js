define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!scripts/common/templates/modal.html',
  ], function($, _, Backbone, modalTemplate) {

  var ModalConfirmView = Backbone.View.extend({
    
    id: "glabal_modal_confirm",
    
    modalTemplate: _.template(modalTemplate),
    /**
     * #FIXME
     */
    events: {
    },
    /**
     * 
     */
    modelElements : {
        
    },
    /**
     * 
     */
    initialize : function(options) {
      _.bindAll(this, 'render');
      this.modelElements =  {
          header : options.header,
          ok : options.ok || "ok",
          dismiss : options.dismiss || "Close",
          body : options.body,
      };
      this.scope = options.scope || this.model  || this ;
      this.events = {
                      "click .confirm" : "confirm",
                      "click .cancel"  : "cancel",
                      "click .close"  : "cancel",
                  };
      if (options.events){
         var scope = this ;
         _.each (options.events, function (key, value){
             scope[key] = function (event){
                    scope['scope'].trigger('view:' + key, event, scope.$el);
             };
         });
        _.extend (this.events, options.events);  
      }
      this.type = options.type || 'confirm';
    },
    //  
    render: function() {
      this.$el.html(this.modalTemplate(this.modelElements));
      this.$el.appendTo ('body');
      if (this.type && (this.type === 'info'))
        this.$el.find('.confirm').hide ();
      this.$el.show ();
      this.delegateEvents();
      this['scope'].trigger('view:readyView', this.$el);
      return this;
    },
    /**
     * 
     * @param {Object} event
     */
    confirm: function(event) {
      event.preventDefault();
      this['scope'].trigger('view:confirm', event,  this.$el, this);
    },
    /**
     * 
     * @param {Object} event
     */
    cancel: function(event) {
      event.preventDefault();
      this.close();
    },
    //
    close: function() {
      this['scope'].trigger('view:cancel',event);
      this.$el.remove ();
      this.remove();
    },
  });
  return ModalConfirmView;
});
