// FileName : collaboration.js
define(['backbone', 'scripts/main/models/collaboration/collaborator'], function(Backbone, collaboratorModel) {
    return Backbone.Collection.extend({
        model : collaboratorModel,
        url : collaboratorModel.prototype.urlRoot,
    });
});
