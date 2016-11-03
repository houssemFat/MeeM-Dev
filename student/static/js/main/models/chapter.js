// Filename: models/chapter
define([
    'common',
    'scripts/main/models/base'], function (_, baseModel) {
    var ChapterModel = baseModel.extend({
        /**
         * 
         */
        baseRoot : 'chapter/' ,
        /**
         * 
         */
        url : function (url){
                return this.urlRoot () + ( this.id ? (this.id + '/'): '') + ( url ? ( url + '/' ): '') ;
        },
        /**
         * 
         */
        defaults : {
            volumeUrl : this.baseUrl + 'volume/',
            cover : 'http://127.0.0.1:8000/static/img/booksclip.jpg',
            poster : 'http://127.0.0.1:8000/static/img/booksclip.jpg',
            source : 'http://localhost:8080/media/courses/videos/test_me.mp4',
            progress : '20'
        }
    });
    return ChapterModel ;
});