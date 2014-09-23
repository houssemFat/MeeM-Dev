define([
  'jquery',
  'underscore',
  'backbone',
  'commonWidget',
  'text!scripts/common/templates/alert.html'
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
      "click .close" : "close"
    },
    /**
     * 
     */
    className : 'app-alert',
    /**
     * 
     * @param {Object} options
     */
    initialize: function(options) {
      this.options_ = options || {};
      this.render ();
   },
   /**
    * 
    */
    render: function() {
        var options = this.options_; 
        var msg = options.msg || '';
        var type = options.type || 'default';
        var  html = options.html || '';
      
        this.$el.html(this.template({msg: msg, type: type, html : html})).css({display:'none' });
      var $alert = this.$el.find ('alert');
      // ceck is just for info 
      if (this.options_.canClose){
            $alert.append ($('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>')).before('.app-alert-body');
            $alert.addClass('alert-dismissable');
      }
      // connect events
      if (this.options_.events){
            var events = this.options_.events,
                $btns = this.$el.find ('#alert_buttons'),
                scope = this;
            // handle events    
            for (var event in events){
                var current = event.split(/[\s,]+/);
                if (current.length !== 2)
                    continue;
                var
                    _class = current[0],
                    _label = current[1],
                    fn = events[event];
                if (!fn)
                    return ;
                $('<button class="btn btn-sm btn-' + _class  + '">' + _label + '</button>').appendTo($btns).click (
                   function (){
                       // call the call back function with the html body
                       fn.call ($alert);
                       // FIXME allow oriing to close current alert
                       //scope.close ();
                   } 
                ); 
            }
            $('#alert_buttons_container', this.$el).css ('height','30');
      }
      this.$el.appendTo('body');
      
      var  totalWidth = $('body').innerWidth(),
           right =  (((totalWidth - this.$el.innerWidth ()) / 2) / totalWidth ) * 100;
      this.$el.css ({'right' : right + '%'}).show();
      common.Widget.showEmptyModal (this.$el, {unbind :true});
    },
    /**
     * 
     */
    close: function() {
      this.remove();
      this.undelegateEvents();
      common.Widget.hideEmptyModal ();
    },
    /**
     * 
     */
    onShow : function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }
  });
});
