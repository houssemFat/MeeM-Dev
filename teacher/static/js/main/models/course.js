// Filename: models/schedule
define(['underscore', 'backbone', 'helper', 'moment'], function(_, Backbone, Helper) {
    var CourseModel = Backbone.Model.extend({
        /***
         * 
         */
        validations : {
            'title' : {
                'required' : true ,
                'min_length' : 6  
            },
            'about' : {
                
            },
            'end_at' : {
                'required' : true ,
                'type' : 'date'
            },
            'start_at' : {
                'required' : true ,
                'type' : 'date'
            },
        },
        /**
         * 
         */
        validate : function (){
            if (!this.get('start_at').isBefore(this.get('end_at'))) {
                return {'date' : 'start must be before end'};
            }
            return null ;
        },
        /**
         *
         */
        /**
         * 
         */
        defaults: {
             title : '',
             about : '',
             short_description : 'help',
             start_at : new moment (),
             end_at : new moment (),
             cerated : null,
             facebook_link : '',
             twitter_link : '',
             google_plus_link : '',
        },
        /**
         * custom json to handle Moment object 
         */
        toJSON : function (){
            var data = Backbone.Model.prototype.toJSON.call(this);
            var value ;
            for (key in data){
                value = data[key];
                if (_.isObject (value) && value._isAMomentObject){
                    data [key] = value.toISOString();
                }
            }
            return data ;
        },
        /**
         * custom json to handle Moment object 
         */
        toJSONDisplay : function (){
            var object =  _.clone(this.attributes);
            var value ;
            for (key in object){
                value = object[key];
                if (_.isObject (value) && value._isAMomentObject){
                    object [key] = value.toLocaleString();
                }
            }
            return object ;
        },
        /**
         * 
         * @param {Object} options
         */
        initialize : function(options) {
            Helper.addCrsfModel (this);
            if (!this.isNew()){
                this._silentSet ({created : new moment(this.get('created'))});
            }
            var start = new moment(this.get('start_at'));
            var end = new moment(this.get('end_at'));
            var created = new moment(this.get('created'));
            this._silentSet ({start_at : start});
            this._silentSet ({created : created});
            this._silentSet ({end_at : end});
            
            start = start.unix();
            end = end.unix();
            var now = moment().unix ();
            var progress = Math.max (0, Math.min(((now - start) / (end  - start)) * 100, 100)) ;
            this._silentSet ({progress : progress});
        },
    });
    // extend model
    return Helper.extendModel (CourseModel, '/course/');
}); 