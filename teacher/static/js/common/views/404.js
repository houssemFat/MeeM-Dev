define([
  'jquery',
  'underscore',
  'backbone',
  'commonWidget',
  'text!scripts/common/templates/404.html'
], function($, _, Backbone, commonWidget, template) {

  return Backbone.View.extend({
    /**
     * 
     */
    template : _.template(template),
    /**
     * 
     */
    events: {
        'click #home'  :  'home',
        'click #conctac_us'  :  'contact',
    },
    /**
     * 
     */
    initialize: function() {
        this.$el.html(this.template());
   },
   /**
    * 
    */
   contact  : function (event){
        event.preventDefault();
        Backbone.history.navigate('company/contact', true);
   },
   /**
    * 
    */
   home  : function (event){
        event.preventDefault();
        Backbone.history.navigate('/', true);
   },
    /**
     * 
     */
    close : function() {
        this.undelegateEvents ();
        this.remove();
   },
  });
});
