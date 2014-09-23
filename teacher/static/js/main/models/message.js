// Filename: models/message
define([
    'underscore',
    'backbone',
    ], function (_, Backbone) {
    return Backbone.Model.extend({
        /**
         * 
         */
        urlRoot : __CONFIG__.getBaseUrl () +  '/inbox',
        /**
         * 
         */
        url : function (url){return this.urlRoot + (url ? url : '')  +  ( this.id ? ('/' + this.id) : '');},
        /**
         * 
         */
        defaults: {
             author : {},
             body : '',
             at : '',
             body : '',
             seen : false,
        },
    });
});