// FileName : team.js
define(['backbone', 
        'scripts/main/models/team'], function(Backbone, TeamModel) {
    return Backbone.Collection.extend({
        model : TeamModel,
        url : TeamModel.prototype.urlRoot,
    });
});
