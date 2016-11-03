define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/common/templates/welcome.html',
], function($, _, Backbone, template) {
  return Backbone.View.extend({
        el : '#welcome',
        slides : {
                'src' : 'http://localhost/work/apps/meemt/images/welcome/',
                'learn' : ['group', 'edit', 'adn'],
                'collaboration' : [ 'calendar', 'film', 'tasks', 'files-o'],
                'features' : ['map', 'microp', 'neural', 'science', 'dinosaur'],
        },
        indexFeatures : 0 ,
        indexLearn  : 0 ,
        indexCollaboration : 0,
        initialize : function () {
            this.template = _.template(template);
            
            this.$el.append (this.template());
            
            var scope = this,
                indexFeature = 1,
                $featuresSlide  = $('#app_features', this.el),
                $learnSlide  = $('#app_learn', this.el),
                $collaborationSlide  = $('#app_collaboration', this.el);
                
            this.featuresSlide = $featuresSlide ;
            this.learnSlide = $learnSlide ;
            this.collaborationSlide = $collaborationSlide ;
            // set Animation 
            setInterval (function (){
               scope.changeSlide ();
            }, 4000);
            /* init first */
            scope.changeSlide ();
            /*$('.app-welcome-slide', this.el).mouseenter(function() { 
                    $('.app-welcome-content', this).show();   
                }).mouseleave(function() {
                    $('.app-welcome-content', this).hide();
                });
           */
            this.appLastCss = '';
            
            this.$divs = $('.body-parts');
            $(window).bind('scroll', function (){
                scope.scrollFn();
                }
            );
            this.scrollFn.call (this);
        },
        changeSlide : function (){
            if (this.indexFeatures > 4)
                this.indexFeatures = 0;
            this.makeSlideChanges ('features', this.indexFeatures ++ );
            
            if (this.indexLearn > 2)
                this.indexLearn = 0;
            this.makeSlideChanges ('learn', this.indexLearn ++ , 'icon');
           
            if (this.indexCollaboration > 3)
                this.indexCollaboration = 0;
            this.makeSlideChanges ('collaboration', this.indexCollaboration ++, 'icon');  
        },
        /**
         * 
         * @param {Object} index
         */
        makeSlideChanges : function (namespace, index, icon){
            var $change = this[namespace + 'Slide'],
                current = this.slides[namespace][index] ;
            if (!icon)
                $change.attr ('src', this.slides.src + namespace + '/' + current + '.png');
            else
                $change.attr ('class','app-welcome-slide-icon fa fa-5x fa-' + current);
                
        },
        /**
         * 
         * @param {Object} object
         */
        changeThis : function (object){
                var currentCss = $(object).attr('data-css');
                $('#body_background').removeClass(this.appLastCss).addClass(currentCss);
                this.appLastCss = currentCss;  
        },
        render : function (){
            
        },
        destroy : function (){
            
        },
        scrollFn : function (){
            var bodyTop = $('body').scrollTop(),
                posTop = 0 ,
                currentCss , 
                scope = this, 
                $divs = this.$divs;
            if (bodyTop !== 0){
                    $divs.each(function (){
                        posTop = $(this).position().top ;
                        if ((posTop <= (bodyTop + 50))){
                            scope.changeThis (this);
                        };    
                });
            }
            else
                scope.changeThis ($divs[0]);
                
        },
    });
});