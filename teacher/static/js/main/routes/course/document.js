define(['app'], function(App) {
   
    return   {
        /**
         * 
         */
        routes :  {
                // video
                "course/:id/docs" : "courseDocumentList",
        },
        // #fix Me
        prototype : {
            
            /**
             *
             * @param {Object} id
             */
            courseDocumentList : function(id) {
                App.router.courseManager(function() {
                    require(['scripts/main/collections/document'], function(DocumentCollection) {
                        $.get(DocumentCollection.prototype.url, {
                            cid : id
                        }, function(response) {
                            require(['scripts/main/views/document/list'], function(ListView) {
                                App.CourseManager.mainRegion.show(new ListView({
                                    collection : new DocumentCollection(response.list),
                                    courseId :  id
                                }));
                                App.CourseManager.updateMenu('docs');
                            });
                        });
                    });
                }, id);
            },
        },
    };
});
