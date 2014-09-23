define(['app'], function(App) {
   
    return   {
        /**
         * 
         */
        routes :  {
                // video
                "chapter/:id/video" : "chapterVideoList",
                "chapter/:id/video/create" : "chapterVideoCreate",
                "chapter/video/:id" : "chapterVideoView",
                "chapter/video/:id/edit" : "videoUpdate",
        },
        // #fix Me
        prototype : {
            
            /**
             *
             * @param {Object} id
             */
            chapterVideoList : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/collections/video/video'], function(VideoCollection) {
                        $.get(VideoCollection.prototype.url, {
                            cid : id
                        }, function(response) {
                            require(['scripts/main/views/video/list'], function(ListView) {
                                App.ChapterManager.updateRegion (new ListView({
                                    collection : new VideoCollection(response.list),
                                    model : new Backbone.Model (_.extend({chapterId :  id}, response))
                                }), 'video');
                            });
                        });
                    });
                }, id);
            },
            
            // #TODO: do something if model wasn't found
            chapterVideoView : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/views/video/view', 
                            'scripts/main/models/video/video',
                            'scripts/main/collections/video/document',
                            
                            ], function(FormView, Model, DocumentCollection) {
                        var video = new Model({  id : id } );
                        video.fetch().done(function(response) {
                            var formView = new FormView({
                                model : video, 
                                documents : new DocumentCollection (response.documents)
                            });
                            App.ChapterManager.updateRegion(formView, 'video');
                            App.ChapterManager.setChapterId (video.get('chapter_id'));
                        });
                    });
                });

            },
            //
            chapterVideoCreate : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/views/video/form', 'scripts/main/models/video/video',
                            'scripts/main/collections/video/document',], function(FormView, Model, DocumentCollection) {
                           var formView = new FormView({
                                model : new Model({  chapter_id : id } ),
                               documents : new DocumentCollection ()
                            });
                            App.ChapterManager.updateRegion(formView, 'video');
                    });
                }, id);

            },
            //
            videoUpdate : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/views/video/form', 'scripts/main/models/video/video',
                            'scripts/main/collections/video/document',], function(FormView, Model, DocumentCollection) {
                        var video = new Model({  id : id } );
                        video.fetch().done(function(response) {
                            var formView = new FormView({
                                model : video, 
                                documents : new DocumentCollection (response.documents)
                            });
                            App.ChapterManager.updateRegion(formView, 'video');
                            App.ChapterManager.setChapterId (video.get('chapter_id'));
                        });
                    });
                });

            },
        },
    };
});
