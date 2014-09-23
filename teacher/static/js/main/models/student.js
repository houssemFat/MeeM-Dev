// Filename: models/student
define(['underscore', 'backbone', 'app'], function(_, Backbone, app) {
    return Backbone.Model.extend({
        /**
         *
         */
        urlRoot : __CONFIG__.getBaseUrl() + '/classroom',
        url : function(url) {
            return this.urlRoot + ( url ? url : '') + (this.id ? ('/' + this.id) : '');
        },
        /**
         *
         */
        defaults : {
            coverUrl : '',
            coursesCount : 0,
            defaultCover : '',
        },
    });
});
