define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'common',
  'text!scripts/main/templates/header/header_in.html',
  ], function($, _, Backbone, App, common, template)  {

  return Backbone.View.extend({
        events : {
            'click .nav-item' :  'navigate',
        },
        /**
         * 
         */
        el  : '#user_menu',
        /**
         * 
         */
        $lastActiveItem : null,
        /**
         * 
         */
        initialize: function(options) {
            this.template = _.template(template || "");
            this.render ();
        },
        /**
         * 
         */
        render: function(options) {
          this.$el.html(this.template(this.model.toJSON()));
          
        },
        /**
         * 
         * @param {Object} event
         */
        navigate : function (event) {
            event.preventDefault ();
            var $item = $(event.currentTarget);
            var href = $item.data('url') ;
            Backbone.history.navigate( href +  '/', true);
            this.updateActiveItem (href);
        },
        /**
         * 
         */
        updateActiveItem : function (href){
            if (this.$lastActiveItem){
                this.$lastActiveItem.removeClass('active');
            }
            var $item = $('.nav-item[data-url="' + href + '"]') ;
            $item.addClass('active');
            this.$lastActiveItem = $item ;
        }
  });
});
