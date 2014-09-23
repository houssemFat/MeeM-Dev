define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/main/templates/question/view.html',
  'appModal',
  'scripts/main/views/response/list'
  ], function($, _, Backbone,  template, ModalView, responseCollection) {
  return Backbone.View.extend({   
    /**
     * 
     */
    template : _.template(template || ""),
    /**
     * 
     */
    initialize: function(options) {
        this.$el = $(this.template(this.model.toJSON()));
        this.on('view:readyView', this.successGetQuestion);
        this.on('view:cancel', this.cancel);
        this.on('view:confirm', this.submit);
        // question item source activiation
        this.tiggredBy = options.tiggredBy ;
        this.render ();
    },
    /**
     * 
     */
    render: function() {
      
      var modalView = new ModalView({
            scope  : this, 
            header : this.model.get('value'),
            body   : this.template(this.model.toJSON()),
            $appendIn : __VP__.player.$playerBody
        });
        modalView.render ();
    },
    /**
     * 
     */
    successGetQuestion : function ($element){
        this.buildView ($element);
        var context = this,
            count = 60000,
            compare = true;// 1 minutes  
       this.countDown_ = setInterval (function (){
                    if ( count > 0 ){
                                context.$countText_.html (context.formatTime (count));
                                count = count - 100;
                                if (compare && (count < 10000)){
                                    context.$countText_.css({'color' : 'red'});
                                    context.$countText_.parent().css({'backgroundColor' : 'white'});
                                    compare = false;
                                }
                            }
                            else {
                                clearInterval (this.countDown_);
                                //context.$continueBtn_.trigger('click');
                            }
                                
                        }, 100);
        var responses =  $.parseJSON(this.model.get ("values"));
        var collection = [];
        for (var key in responses){
            collection.push ({"label" : key, "value": Boolean(responses[key])});
        }
        this.responseCollection = new responseCollection ({collection : new Backbone.Collection(collection), $container : $element});
    },
    /**
     * 
     * @param {Object} time
     */
    formatTime : function(milliseconds){
        return  Math.floor(milliseconds / 1000) + ":" + (Math.floor(milliseconds % 1000)/10) ;
    },
    /**
     * 
     */
    buildView : function ($element){
        this.$countText_ = $element.find('#counter');
    },
    
    /**
     * 
     */
    cancel : function ($element){
        clearInterval(this.countDown_);
        this.tiggredBy.continue_ () ;
    },
    /**
     * 
     */
    submit : function ($body){
        clearInterval (this.countDown_);
        responses = { id : this.model.get('id')};
        _.each(this.responseCollection.collection, function(item) {
            responses[item.get('label')] =  item.get('value') ; 
        });
        $.ajax({
            'type' : 'post',
            'url' : this.model.url('submit'),
            'data' : responses,
            'success' : $.proxy(this.successSubmit, this) ,
        });
    },
    
    /**
     * 
     */
    successSubmit : function (response){
       
    },
    /**
     * 
    * @param {Object} id
    * @param {Object} object
     */
    close : function (){
        this.remove ();
    },
  });
});
