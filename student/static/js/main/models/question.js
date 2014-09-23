// Filename: models/schedule
define([
    'underscore',
    'backbone',
    'App'], function (_, Backbone, App) {
    var QuestionModel = Backbone.Model.extend({
         urlRoot : '/j/question',
         url : function (url){return this.urlRoot + ( this.id ? ('/' + this.id ): '') + ( url ? ('/' + url ): '') ;},
        /**
         * 
         */
        defaults : {
            success : '80',
            fail : '20',
            tried : 0
        },
        initialize : function (){
            //this.get('value').length ();
            var success = _.random(0, 100) ;
            this.set ({'success' : success}, {silent : true});
            this.set ({'fail' : 100 - success}, {silent : true});
        }
    });
    return QuestionModel ;
});