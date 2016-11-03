// validation extends
var modelValidation = function() {
    if (this.validations) {
        var validations = this.validations;
        var validations_;
        var type_;
        var length_;
        var length_;
        var value;
        for (attr in validations) {
            validations_ = validations[attr];
            value = this.get(attr);
            // required
            if (validations_['required'] && (value.length < 1)) {
                return {
                    src : attr,
                    rule : 'required'
                };
            }
            // type
            type_ = validations_['type'];
            if (type_) {
                if (!common.validate(value, type_))
                    return {
                        src : attr,
                        rule : 'type',
                        'message' : 'invalid ' + type_
                    };
            }

            // length
            if (validations_['length'] && (value.length !== validations_['length'] )) {
                return {
                    src : attr,
                    rule : 'length'
                };
            }

            // length
            if (validations_['min_length'] && (value.length < validations_['min_length'] )) {
                return {
                    src : attr,
                    rule : 'min_length'
                };
            }

            // length
            if (validations_['max_length'] && (value.length > validations_['max_length'] )) {
                return {
                    src : attr,
                    rule : 'max_length'
                };
            }
        }
    }
    return null;
};

// helper.js created 04/08/2014
(function() {
    // Baseline setup
    // --------------

    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    // Save the previous value of the `helper` variable.
    // exports on the server
    var previousHelper = root.Helper;
    var h = function(obj) {
        if ( obj instanceof h)
            return obj;
        if (!(this instanceof h))
            return new h(obj);
    };

    if ( typeof exports !== 'undefined') {
        exports = h;
    } else {
        root.Helper = h;
    }
    // use simple var
    Helper.addCrsfModel = function(backboneModel) {
        // django csrf middle ware
        backboneModel._silentSet({
            'csrfmiddlewaretoken' : __CONFIG__.csrf
        });
        return backboneModel;
    };

    // use simple var
    Helper.addCrsf = function(object) {
        // django csrf middle ware
        object['csrfmiddlewaretoken'] = __CONFIG__.csrf;
        return object;
    };
    // internal function used instead of silent : true
    Helper._silentSet = function(object) {
        //  foreach object
        this.set(object, {
            'silent' : true
        });
        return this;
    };
    // url root model for backbone Model
    Helper.urlRoot = function(url) {
        var _url =  __CONFIG__.getBaseUrl() + url;
        if (_url.lastIndexOf ('/') !== _url.length - 1)
            _url += "/";
        return _url ;
    };
    // url model for backbone Model
    Helper.modelUrl = function(after_id, before_id) {
        var before_id = before_id || "";
        var after_id = after_id || "";
        var base =  this.urlRoot + before_id  + (this.id ? (this.id) : '') +  after_id ;
        // base not ends with '/'
        if (base.lastIndexOf ('/') !== base.length - 1)
            base += "/";
        return base ;
    };
    // extend a backobone model
    Helper.extendModel = function(model, url) {
        _.extend(model.prototype, {
            // extend url root
            urlRoot : Helper.urlRoot(url),
            // extend url
            url : Helper.modelUrl,
            //set base  url 
            baseURL : __CONFIG__.getBaseUrl(),
            /**
             * Internal client silent true
             */
            _silentSet : Helper._silentSet,
            /**
             *
             * @return {Object}
             */
            validateAttributes : function (){
                var response = this.validate ? this.validate () : modelValidation.call(this);
                return response;
             },
        });
        return model;
    };
    // Run helper.js in *noConflict* mode, returning the `Helper` variable to its
    // previous owner. Returns a reference to the helper object.
    Helper.noConflict = function() {
        root.Helper = previousHelper;
        return this;
    };
}).call(window);
