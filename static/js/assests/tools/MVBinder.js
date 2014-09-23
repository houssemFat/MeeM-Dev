/**
 * sample Model to view binder
 */
// Backbone.MVBinder v0.0.1
//
// Copyright (C)2014 F houssem, MeeM
// Distributed Under MIT Liscene
//
// ----------------------------
// Backbone.MVBinder
// ----------------------------
;(function(root) {
    var _directbinds = 'html,val'.split(',');
    var _attrbinds =  'href,backgroundColor'.split(',');
    var ElementBinder = function() {
        this.init.apply (arguments);
    };
    ElementBinder.prototype = {
        init : function(dom, model, attributes) {
            this.dom = dom;
            this.model = model;
            this.attribues = $(dom).attr('mvb-attr').split('|');
        },
        update : function() {
            var value = "";
            var scope = this;
            _.each(this.attribues, function(attr) {
                value += scope.model.get(attr);
            });
            $(this.dom).html(value);
        },
        model : null,
        dom : null,
        attributes : null,
    };
    var setToElement = function ($el, attr, value){
         if (_directbinds.indexOf(attr) > -1){
            $el[attr](value);
            return ; 
         } 
         $el.attr({attr : value});
     };
    var modelToViewBinder = (function(Backbone, _, $) {
        
        var modelToViewBinding = {
            /**
             *
             */
            version : "0.0.1",
            /**
             *
             */
            attrsDicontary : null,
            /**
             * Useful for instant change 
             * @param {Object} view
             * @param {Object} options
             */
            register : function(view, options) {
                var elements = $('[mvb-attr]', view.$el[0]);
                var attrsDicontary = {};
                elements.each(function() {
                    var attributes = $(this).attr('mvb-attr').split('|');
                    var key;
                    for (var i = 0; i < attributes.length; i++) {
                        key = attributes[i];
                        if (!attrsDicontary[key])
                            attrsDicontary[key] = [];
                        attrsDicontary[key].push(new ElementBinder(this, view.model, attributes));
                    }
                });
                this.attrsDicontary = attrsDicontary;
                var scope = this;
                _.each(_.keys(attrsDicontary), function(key) {
                    view.model.on('change:' + key, function(model, value) {
                       var list = scope.attrsDicontary[key];
                       _.each(list, function (elementBinder){
                           elementBinder.update ();
                       });
                    });
                });
            },
            /**
             * Useful for binding after save instant change 
             * @param {Object} view
             * @param {Object} options
             */
            bind : function(view, options) {
                var elements = $('[mvb-attr]', view.$el[0]);
                var attrsDicontary = {};
                elements.each(function() {
                    var $this = $(this);
                    var attributes = $this.attr('mvb-attr').split('|');
                    var place = $this.attr('mvb-on') ;
                    var place = place || "html";
                    var model = view.model;
                    var key;
                    var value = "";
                    for (var i = 0; i < attributes.length; i++) {
                        value += view.model.get(attributes[i]);
                        if (i < attributes.length - 1){
                            value+= " ";
                        }
                    }
                    setToElement($this, place ,value);
                });
            }
        };

        return modelToViewBinding;
    });
    // Backbone.Modelbinding AMD wrapper with namespace fallback
    if ( typeof define === 'function' && define.amd) {
        // AMD support
        define(['backbone', // use Backbone 0.5.3-optamd3 branch (https://github.com/jrburke/backbone/tree/optamd3)
        'underscore', // AMD supported
        'jquery' // AMD supported
        ], function(Backbone, _, jQuery) {
            return modelToViewBinder(Backbone, _, jQuery);
        });
    } else {
        // No AMD, use Backbone namespace
        root.Backbone = Backbone || {};
        root.Backbone.MVBinder = modelToViewBinder(Backbone, _, jQuery);
    }

})(this);
