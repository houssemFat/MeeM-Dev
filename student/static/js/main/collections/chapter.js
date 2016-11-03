define([
  'jquery',
  'underscore', 
  'backbone', 
  'scripts/main/models/chapter'
  ], function($, _, Backbone, ChapterModel){
      
    var ChapterCollection = Backbone.Collection.extend({
        model: ChapterModel,
        url: 'chapter',

  });

  return ChapterCollection;
});
