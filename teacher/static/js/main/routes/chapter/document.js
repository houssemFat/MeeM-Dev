define(['app'], function(App) {
   
    return   {
        /**
         * 
         */
        routes :  {
                // video
                "chapter/:id/document" : "chapterDocumentList",
        },
        // #fix Me
        prototype : {
            
            /**
             *
             * @param {Object} id
             */
            chapterDocumentList : function(id) {
                App.router.chapterManager(function() {
                    require(['scripts/main/collections/document'], function(DocumentCollection) {
                        $.get(DocumentCollection.prototype.url, {
                            cid : id
                        }, function(response) {
                            require(['scripts/main/views/document/list'], function(ListView) {
                                App.ChapterManager.updateRegion (new ListView({
                                    collection : new DocumentCollection(response.list),
                                    chapterId :  id
                                }),'document');
                            });
                        });
                    });
                }, id);
            },
        },
    };
});
