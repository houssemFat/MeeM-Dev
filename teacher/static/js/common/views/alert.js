define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/common/templates/alert.html'
], function($, _, Backbone, template) {

  return Backbone.View.extend({
    template : _.template(template),
    events: {
      "click .close" : "close"
    },

    initialize: function(options) {
      this.msg = options.msg;
      this.type = options.type;
      this.options_ = options || {};
      if (options.render){
          this.render ();
      }     
   },
   /**
    * 
    */
    render: function() {
      this.$el.html(this.template({msg: this.msg, type: this.type})).css({
          display:'none' , position:  'fixed', top:'20px' , zIndex: '5000',
      });
      if (this.options_.events){
            var events = this.options_.events,
                $btns = this.$el.find ('#alert_buttons'),
                scope = this;
            // handle events    
            for (var event in events){
                var current = events[event],
                    _class = current['class'] || '',
                    label = current['text'] || '',
                    func = current['function'] || '';
                if (!func)
                    return ;
                $('<button class="btn btn-default btn-sm ' + _class  + '">' + label + '</button>').appendTo($btns).click (
                   function (){
                       // call the call back function
                       func ();
                       // close me
                       scope.close ();
                   } 
                ); 
            }
            $('#alert_buttons_container', this.$el).css ('height','30');
      }
      this.$el.appendTo('body');
      var  totalWidth = $('body').innerWidth(),
           right =  (((totalWidth - this.$el.innerWidth ()) / 2) / totalWidth ) * 100;
      this.$el.css ({'right' : right + '%'}).show();
    },
    /**
     * 
     */
    close: function() {
      this.remove();
      this.undelegateEvents();
    },
    /**
     * 
     */
    onShow: function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }
  });
});
