define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/common/templates/welcome.html'
], function($, _, Backbone, template) {
  return Backbone.View.extend({
      /**
       * 
       */
        template : _.template(template),
        /**
         * 
         */
        slides :  ['different', 'open', 'massive', 'lab', 'explore',  'meem'],
        /**
         * 
         */
        indexFeatures : 0 ,
        /**
         * 
         */
        events : {
            'click .app-welcome-how-item' : 'changeSlide',
        },
        autoPlay : null ,
        /**
         * 
         */
        initialize : function () {
            this.$el.html (this.template()).appendTo('#body_container');
            this.featuresContentTabs = this.$el.find ('.app-welcome-how-content');
            this.featuresTabs = this.$el.find ('.app-welcome-how-item');
            var scope = this ;
            var autoplay = function (){
                var $el = scope.featuresTabs.filter('#' + scope.slides[scope.indexFeatures++]);
                scope.changeSlide (null, $el);
                if (scope.indexFeatures > 5)
                    scope.indexFeatures = 0 ;
            };
            this.autoPlay = setInterval (autoplay, 4000);
            autoplay ();
        },
        /**
         * 
         */
        changeSlide : function (event, $element ){
            var $el = $element ;
            if (event){
                $el = $(event.currentTarget);
                clearInterval (this.autoPlay);
            }
            this.makeSlideChanges ($el);  
        },
        /**
         * 
         * @param {Object} index
         */
        makeSlideChanges : function ($el){
           this.featuresTabs.removeClass ('active-item');
           var toActive = $el.attr('id');
           this.featuresContentTabs.hide ();
           this.featuresContentTabs.filter('[for-id="' + toActive  + '"]').show(); 
           $el.addClass ('active-item');
        },
        /**
         * 
         */
        destroy : function (){
            
        },
    });
});