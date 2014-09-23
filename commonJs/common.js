/**
 * common.js v0.0.1 by fathallah houssem
 * Copyright 2013 MeeM.
 MIT
 */'use strict';
if (!jQuery) {
    throw new Error("a requires jQuery");
};
/**
 * Define the global name a
 */
var a = {
    /**
     * Define the version of a
     */
    VERSION : '0.0.1', // alpha version
    /**
     * return a html random color
     * @return {string}
     */
    getRandomColor : function() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    },
    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt : function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * @param {String} key
     * @return {String}
     */
    _transalte : function(key) {
        var string = __CONFIG__.Tr[key] || key;
        var args = arguments;
        var lang = (__CONFIG__.locale === "ar" ) ? true : false;
        for (var i = 1; i < args.length; i++) {
            //string = string.replace( lang ? (i + '%') : ('%' + i), args[i]);
            string = string.replace('*' + String(i) + '*', args[i]);
        }
        return string;
    },
    /**
     *
     */
    tr : function() {
        return a._transalte.apply(this, arguments);
    },
    /**
     *
     */
    pop : function(obj, element) {
        if (a.isObject(obj))
            return a.popFromObject(obj, element);

        if (a.isArray(obj))
            return a.popFromArray(obj, element);

    },
    popFromArray : function(obj, element) {
        var index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    },
    /**
     *
     */
    popFromObject : function(obj) {
        var new_object = {};
        var args = arguments;
        var exclude = [];
        for (var i = 1; i < args.length; i++) {
            exclude.push(args[i]);
        };
        for (var key in obj) {
            if (exclude.lastIndexOf(key) > -1)
                continue;
            new_object[key] = obj[key];
        }
        return new_object;

    },
    /**
     * from underscore code
     * return if the given object is an object
     */
    isObject : function(obj) {
        return obj === Object(obj);
    },

    /**
     * from underscore code
     * return if the given object is an object
     */
    isArray : function(obj) {
        return Array.isArray(obj);
    },
    /**
     * Return a truncate string
     * @param {String} string
     * @param {Number} length
     * @param {Number} add
     * @param {Number} start
     * @return {String}
     */
    truncateString : function(string, length, add, start) {
        if (!string)
            return '';
        if (string.length <= length) {
            return string;
        }
        var _start = 0;
        if (start && parseInt(start))
            _start = start;
        var value_ = string.substr(_start, length);
        return add ? (value_ + ' ' + add ) : value_;
    },
    /**
     * @param {String} file
     * @param {Array} extensions
     * @return {Boolean}
     *
     */
    checkExtension : function(file, extensions) {
        var title = file.name, extention = title.substr(title.lastIndexOf('.') + 1), length = extensions.length;
        return (length === 0) ? true : (extensions.indexOf(extention) > -1);
    },
    /**
     * load a css file and run call
     * @param {Array|String} url
     * @param {Function} callback
     */
    loadCss : function(url, callback) {
        var urls = url;
        if (!$.isArray(url)) {
            if ( typeof (url) === 'string') {
                urls = [url];
            }
        } else {
            return;
        }
        var i = 0;
        var link;
        for (; i < url.length; i++) {
            link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        }
        console.log('this function does not assume the loading css order, please pack your css files !!');
        //
        if (callback) {
            /**link.onload  = function () {
             callback ();
             };**/
            link.addEventListener('load', function() {
                callback();
            });
        }
    },
    /**
     *
     * @return {Number}
     */
    getUid : function() {
        return (new Date()).getTime();
    },
    /**
     * @param {String} value
     * @param {String} type
     * @return {Boolean}
     */
    validate : function(value, type) {
        switch (type) {
            case 'email':
                return a.isEmail(value);
            case 'url':
                return a.isUrl(value);
            case 'int':
                return $.isNumeric(value);
            case 'date':
                return (Date.parse(value) !== NaN);
            default :
                throw new Error("undefined " + type + " for validate " + value);
        }
    },
    /**
     * check if a given is email
     * @param {String} string
     * @return {Boolean}
     */
    isEmail : function(string) {
        // #FIXME try to check is it correct
        return /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i.test(string);
    },

    /**
     * check if a given is an url
     * @param {String} string
     * @return {Boolean}
     */
    isUrl : function(string) {
        // #FIXME try to check is it correct
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(string);
    },
    /**
     *
     */
    activateTranslate : function() {
        var translate = function() {
            $('[tr-value]').each(function() {
                var $el = $(this);
                var totranslate = $el.attr('tr-value');
                $el.html(common.tr(totranslate));
                $el.removeAttr('tr-value');
            });
        };
        $(document).bind("DOMNodeInserted", function() {
            translate();
        });
        translate();
    }
};
// django helper
// __CONFIG__
a.django = {
    /**
     *
     */
    csrf_token : function() {
        return "<input type='hidden' name='csrfmiddlewaretoken' value='" + __CONFIG__.csrf + "'>";
    },
    /**
     *
     */
    appendcsrf : function(obj) {
        obj['csrfmiddlewaretoken'] = __CONFIG__.csrf;
        return obj;
    }
};
Array.remove = a.popFromArray;
Object.removeKeys = a.popFromObject;
// shorCut
window.common = a;
window.MMC = {};
window.MMC.tr = function(key) {
    console.log('Deprecation warning: global name space MMC is deprecated and it will be removed in beta version, please use a instead !');
    return a.tr(key);
};
$(document).ready(function() {
    var $element;
    var value;
    $("[data-tr]").each(function(index) {
        $element = $(this);
        var value = a.tr($element.attr("data-tr"));
        var attr = a.tr($element.attr("data-tr-for"));
        $element[attr](a.tr(value));
        $element.removeAttr("data-tr");
    });
});
