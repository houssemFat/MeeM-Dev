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
            'click .nav-btn' :  'navigate',
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
            
            // add dynamic route
            App.router.route('profile/', 'profile', $.proxy(this.viewProfile,this));
            if ("profile/" === Backbone.history.fragment){
               Backbone.history.loadUrl('profile/'); 
            }
        },
        /**
         * 
         */
        viewProfile : function (options){
            var model = this.model;
            require(['scripts/main/views/user/profile'], function(Form) {
                
                  App.mainRegion.show(new Form({
                    model : model
                  }));
          });
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
