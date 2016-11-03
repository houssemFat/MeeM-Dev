define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'common'
  ], function($, _, Backbone, App, common)  {

  return Backbone.View.extend({
        /**
         * 
         */
        id : null ,

        /**
         * 
         */
        events : {
            'click .side-menu-nav-item'  : 'navigate',
        },
        /**
         * 
         */
        module : null ,
        /**
         * 
         */
        initialize : function (module, mainObject, disableList){
            if (disableList){
                this.disable (disableList);
            }
            this.module = module ;
            this.$el = mainObject.$el.find ('#app_' + module + '_menu');
            this.lastItem = mainObject.$el.find ('a.active'); 
        },
        /**
         * 
         */
        disable : function (list){
            for (var i in list ){
                $('.side-menu-nav-item[href='+ list[i] +']', this.$el).addClass('btn disabled').off('click');
            }
        },
        /**
         * 
         */
        navigate : function (event){
            event.preventDefault ();
            var source = event.currentTarget ;
            var  toActivate = $(source).attr('href') ;
            Backbone.history.navigate( this.getNavUrl (toActivate),  true);
            this.hilightActiveItem (toActivate);
        },
        
        /**
         * 
         */
        getNavUrl : function (active){
            // add id prefix
            return this.module +  '/' + (App.currentCourseId ?  (App.currentCourseId + '/' ) : '') + active ;
        },
        /**
         * 
         */
        hilightActiveItem : function (active){
            if (this.$lastItem)
                this.$lastItem.removeClass ('active');
            var $current = this.$el.find('a[href="'+ active +'"]');
            $current.addClass ('active');
            this.$lastItem = $current ;
        },
  });
});
