define([
  'jquery', 
  'underscore', 
  'backbone',
  'scripts/main/sideMenu',
  'app',
  'common',
  ], function($, _, Backbone, SideMenu , App, common)  {

  return SideMenu.extend({
        /**
         * 
         */
        collapsesByKeys : {
            'Content' : ['edit', 'video', 'docs'],
            'Work' : ['quiz', 'peer-assignement', 'task'],
            'Interaction' :['forum', 'students'],
            'Tools' : ['tools', 'apps'], 
        },
        /**
         * 
         */
        getNavUrl : function (active){
            // add id prefix
            return 'chapter/' + (App.currentChapterId  ?  (App.currentChapterId  + '/' ) : '') + active ;
        },
        /**
         * 
         */
        collapse : function (active){
            var hrefs = this.collapsesByKeys ;
            for (key in hrefs){
                 if (hrefs[key].lastIndexOf(active) > -1){
                     var $lastActiveElement = $('.collapse.in', this.$el);
                     var lastActiveId = '#' + $lastActiveElement.attr('id');
                     var toActivateId = '#collapse' + key;
                     if (lastActiveId === toActivateId)
                        break;
                     // close current activate
                     $(lastActiveId).collapse ('toggle');
                     // acivate current item
                     $(toActivateId, this.$el).collapse ('toggle');
                     break ;
                 }
            }
        },
        
  });
});
