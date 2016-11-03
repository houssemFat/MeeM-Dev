// Filename: models/schedule
define(['underscore', 'backbone', 'helper', 'moment'], function(_, Backbone, Helper) {
    var VideoModel = Backbone.Model.extend({
        /***
         * 
         */
        validations : {
            'title' : {
                'required' : true ,
                'length' : 6  
            },
            'description' : {
                
            },
            'url' : {
                'required' : true ,
                'type' : 'url'
            },
        },
        /**
         *
         */
        defaults : {
            // title 
            title : '',
            // title 
            description : '',
            // moment js date time , iso iso8601 
            created : '',
            // date 
            scriptname : 0,
            // 
            url : "http://vjs.zencdn.net/v/oceans.mp4",
        },
        /**
         * 
         * @param {Object} options
         */
        initialize : function(options) {
            Helper.addCrsfModel (this);
        },
        /**
         * #FIXME created must be a moment object
         */
        render : function (){
            if (!this.isNew()){
                this._silentSet ({created : new moment(this.get('created'))});
            }
        },
        
    });
    // extend model
    return Helper.extendModel (VideoModel, '/video/');
}); 