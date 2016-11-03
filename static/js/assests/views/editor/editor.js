define(['underscore'], function(_, templateList, templateHTML, templateEmphasis, templateLink, templateImage, templateFontStyles, templateColor) {
    return Backbone.View.extend({

        /**
         *
         */
        events : null,
        /**
         *
         */
        initialize : function(selector, options) {
            this.options = options ;
            this.init (selector, options || {});
        },
        /**
         *
         */
        _editor : null,
        /**
         *
         * @param {JqueryObject} $element jquery element
         */
        init : function(selector) {
            var $element = $(selector);
            var scope = this;
            require(['vender/bootstrap-wysihtml5/locales/bootstrap-wysihtml5.'  + 'ar-Ar'], function() {
                var styleoptions = {
                    /*customTemplates : scope.myCustomTemplates,*/
                    locale : 'ar-Ar',
                    color : true,
                    stylesheets : ['static/css/bootstrap-wysihtml5.css', 'static/css/bootstrap-wysihtml5.rtl.css', 'static/css/wysiwyg-color.css'], 
                    // Class name to add to the body when the wysihtml5 editor is supported
                    bodyClassName : "wysihtml5-editor",
                    parserRules : wysihtml5ParserRules
                };
                // add on change function 
                var options = $.extend(true, scope.options, styleoptions);
                if (options.events && !options.events.change){
                    options.events['change'] = function (object){
                        //alert ('change');
                    };
                }
                this._editor  = $element.wysihtml5(options);
            });

        },
        /**
         *
         * @param {String} locale
         */
        myCustomTemplates : {
            'lists' : function(locale, options) {
                return _.template(templateList)();
            },
            'html' : function(locale, options) {
                return _.template(templateHTML)();
            },
            'emphasis' : function(locale, options) {
                return _.template(templateEmphasis)({
                    locale : locale,
                    options : {
                        ikteb : {
                            target : 'it'
                        }
                    }
                });
            },
            'font_styles' : function(locale, options) {
                return _.template(templateFontStyles)(locale);
            },
            'image' : function(locale, options) {
                return _.template(templateImage)();
            },
            'link' : function(locale, options) {
                return _.template(templateLink)();
            },
            'color' : function(locale, options) {
                return _.template(templateColor)(locale);
            }
        },
    });
});
/**
 *'editorParser', 'text!scripts/common/templates/editor/lists.html', 'text!scripts/common/templates/editor/html.html', 'text!scripts/common/templates/editor/emphasis.html', 
'text!scripts/common/templates/editor/link.html', 'text!scripts/common/templates/editor/image.html', 'text!scripts/common/templates/editor/font_styles.html', 'text!scripts/common/templates/editor/color.html'*/