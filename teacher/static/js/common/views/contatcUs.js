define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/common/templates/contact_us.html'
], function($, _, Backbone, template) {

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
   submit  : function (event){
        
   },
   /**
    * 
    */
   successPost  : function (response){
        Backbone.history.navigate('/');
   },
   /**
    * 
    */
   errorPost  : function (response){
       
   },
    /**
     * 
     */
    close : function() {
        this.undelegatEvents ();
        this.remove();
   },
  });
});
