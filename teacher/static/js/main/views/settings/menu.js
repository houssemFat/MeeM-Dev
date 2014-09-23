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
        getNavUrl : function (active){
            // add id prefix
            return 'settings/'  + active ;
        },
  });
});
