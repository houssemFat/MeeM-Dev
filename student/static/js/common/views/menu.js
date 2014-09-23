define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'common',
  'text!scripts/common/templates/header/header_out.html',
  ], function($, _, Backbone, App, common, tplOut)  {

  return Backbone.View.extend({
        el  : '#user_menu',
        initialize : function (option) {
          
        },
        open : function (option) {
          
        },
        close : function (option) {
          this.$el.html(_.template(tplOut)());
          // animate 
          this.$el.find('.page-scroll a').bind('click', this.animate);
            // Highlight the top nav as scrolling occurs
            $('body').scrollspy({
                target: '.navbar-fixed-top'
            });

        },
        animate : function (event){
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        }
  });
});
