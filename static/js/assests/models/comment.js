// Filename: models/schedule
define(['underscore', 'backbone', 'helper'], function(_, Backbone, Helper) {
    return  Backbone.Model.extend({
        /***
         *
         */
        validations : {
            'comment' : {
                'required' : true,
                'min_length' : 10
            },
        },
        /**
         *
         */
        defaults : {
            title : '',
            /**
             * 
             */
            comment : '',
            /**
             * 
             */
            submit_date : null,
            /**
             * 
             */
            'csrfmiddlewaretoken' : __CONFIG__.csrf,
            /**
             * 
             */
            model_id : null,
            /**
             * 
             */
            obj_id : null,
            
        },
        /**
         * 
         */
        urlRoot : function (){
            return '/comment/' ;
        },
        /**
         * 
         * @param {Object} url
         */
        url : function(url) {
            var  endroute = this.isNew() ? (this.get('model_id')  + '/' + this.get('obj_id')) :  this.id ;
            return this.urlRoot () + endroute + '/';
        },
    });
});
