// FileName : inbox.js
// created : 30/06/2014
define(['jquery', 'underscore', 'backbone', 'scripts/main/models/message'], function($, _, Backbone, inboxModel) {
    return Backbone.Collection.extend({
        model : inboxModel,
        url : inboxModel.prototype.urlRoot,
    });
});
