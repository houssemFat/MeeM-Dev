// Filename: models/schedule
define([
    'underscore',
    'backbone',
    'App'], function (_, Backbone, App) {
    var StudentBaseModel = Backbone.Model.extend({
         /**
          * 
          */
         urlRoot : function () { 
             // find base root from model
             var relative = "";
             // collection case
             if (this.model){
                relative = this.model.prototype.baseRoot ;   
             }
             // model case 
             else {
                 relative = this.baseRoot ;   
             }
             return 'student/j/' + relative;
         },
         /**
         * 
         */
        idAttribute : 'id'
    });
    return StudentBaseModel ;
});