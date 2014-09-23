/**
 * widget.js v1.0.0 by fathallah houssem
 * Copyright 2013 MeeM.
 */
if (!jQuery) {
    throw new Error("widget requires jQuery");
};
if (!common) {
    throw new Error("widget requires main common ");
};'use strict';
/**
 *
 */
WidgetHandler = function(event) {
    if (event.keyCode == 27) {
        common.Widget.hideModal();
        return;
    }
    $(common.Widget._widgets).each(function() {
        var widgetParameters = this.__meWidget;
        if (widgetParameters.options.hide)
            $(this).hide();
        if (widgetParameters.fn)
            widgetParameters.fn();
    });
};
/**
 *
 */
common.Widget = {
    VERSION : '0.0.1',
    MODAL_STATE : 'H',
    _widgets : [],
    _modals : [],
    addToWidgets : function(object, options, callBackFn) {
        if (!object.__meWidget) {
            object.__meWidget = {};
            object.__meWidget.options = options;
            object.__meWidget.fn = callBackFn;
            common.Widget._widgets.push(object);
        }
    },
    /**
     *
     * @param {Object} object
     * @param {Object} event
     */
    getPercentLeft : function(object, event) {
        var left = event.clientX - $(object).offset().left, width = $(object).width();
        left = Math.min(Math.max(left, 0), width);
        return (left / width) * 100;
    },
    /**
     *
     * @param {Object} content
     * @param {Object} options
     */
    displayModal : function(content, options) {

        // close opened model
        if (common.Widget.MODAL_STATE === 'A')
            common.Widget.hideModal();
        // hide all other modals
        if (!content)
            return;
        var options = options || {}, $dialog = $(content), bgcolor = options.bgcolor || '#ffffff';
        $(common.Widget._modals).hide();
        if ( typeof (content) === 'string') {
            $dialog = $('#' + content + ':eq(0)');
        }
        if ($dialog.length > 0) {
            common.Widget.showEmptyModal({
                bg : bgcolor,
                unbind : options.fixed
            });
            if (!$dialog.appModal_) {
                $dialog.appModal_ = true;
                common.Widget._modals.push($dialog);
                if (options.close && ( typeof (options.close) === "function")) {
                    $dialog.__appOnCloseModal = function() {
                        options.close.call(options.scope || this, this);
                    };
                }
                if (options.fixed) {
                    $(document).unbind('keydown', WidgetHandler);
                } else {
                    $(document).bind('keydown', WidgetHandler);
                }
                // bind resize scroll
                $(window).bind('resize scroll', common.Widget.updatePosition);

                //
                $('.app-modal-close', $dialog[0]).click(function() {
                    common.Widget.hideModal();
                });
            }
            //
            $dialog.appendTo('body');
            common.Widget.MODAL_STATE = 'A';
            //
            $(content).resize(function() {
                alert('me');
            });
            //
            setTimeout(function() {
                common.Widget.updatePosition();
            }, 500);
            common.Widget.ACTIVE_MODAL = $dialog;
            return $dialog;
        }
    },
    /**
     *
     */
    updatePosition : function() {
        var $modal = common.Widget.ACTIVE_MODAL, inwidth = $modal.innerWidth(), $body = $('body'), bodyWidth = $body.innerWidth(), scrollTop = $body.scrollTop(), scrollLeft = $body.scrollLeft(), top = scrollTop + 60;
        // #FIXME
        // loaded for first time , check tolerance
        if (Math.abs(bodyWidth - inwidth) < 20) {
            var minWidth = parseInt($modal.css('minWidth'));
            inwidth = Math.max(minWidth, 100);
        }
        var halfScreen = (bodyWidth) / 2;
        var halfWidth = inwidth / 2;
        var fromHalf = halfScreen - halfWidth;

        $modal.css({
            'top' : top,
            'left' : (scrollLeft + fromHalf),
            'position' : 'absolute',
            'right' : '',
            'minWidth' : '200px'
        }).show();
    },
    /**
     *
     */
    hideModal : function() {
        common.Widget.hideEmptyModal();
        $(common.Widget._modals).hide();
        $('.hidden').hide();
        common.MODAL_STATE = 'H';
        if (common.Widget.ACTIVE_MODAL.__appOnCloseModal)
            common.Widget.ACTIVE_MODAL.__appOnCloseModal();
        $(window).unbind('resize scroll', common.Widget.updatePosition);
    },
    /**
     *
     * @param {Object} options
     */
    showEmptyModal : function(options) {
        var _options = options || {}, unbind = options.unbind, ref = options.el, top = 0, bgcolor = options.bgcolor || '#ffffff';
        if (!common.Widget.modalOpacity_) {
            var $modalBg = $('<div class="app-modal-bg"></div>').appendTo('body');
            common.Widget.modalOpacity_ = $modalBg[0];
        }
        var $modal = $(common.Widget.modalOpacity_);

        if (!unbind)
            $modal.bind('click', common.Widget.hideModal);
        else
            $modal.unbind('click', common.Widget.hideModal);
        common.Widget.showBackgroundModal(bgcolor, top);
        // bind resize scroll

    },
    /**
     *
     */
    showBackgroundModal : function(bgcolor, top) {
        $(common.Widget.modalOpacity_).css({
            'height' : $(document).height(),
            'backgroundColor' : bgcolor,
            top : top
        }).show();
    },
    /**
     *
     */
    hideEmptyModal : function(options) {
        $(common.Widget.modalOpacity_).hide();
    },
    /**
     *
     * @param {Object} $parent
     */
    overlay : function(parent, options) {
        if (!parent)
            return;
        // check for jquery
        var $parent = $(parent);
        if ($parent.find('.app-overlay').length < 1) {
            var $target = $parent;
            // used for out contents
            if (options && options.selector) {
                $target = $(options.selector, $parent[0]);
            }
            $overlay = $('<div class="app-overlay">' + '<div class="app-loading"></div><div>').appendTo($target);
            /*$target.css({
                'position' : 'relative'
            });*/
        }
        $parent.find('.app-overlay').show();

    },
    /**
     *
     * @param {Object} object
     */
    unOverlay : function(parent) {
        if (!parent)
            return;
        // check for jquery
        var $parent = $(parent);
        $parent.find('.app-overlay').hide();
    },
};
/**
 * Slider
 */
common.Slider = function(object, options) {
    return new common.SliderApp(object, options);
};

common.SliderApp = function(object, options) {
    function getPercentLeft(object, event) {
        var left = event.clientX - $(object).offset().left, width = $(object).width();
        left = Math.min(Math.max(left, 0), width);
        return (left / width) * 100;
    };
    function getPercentTop(object, event) {
        var top = event.pageY - $(object).offset().top, height = $(object).height();
        top = height - top;
        top = Math.min(Math.max(top, 0), height);
        return (top / height) * 100;
    };
    function getPercentRight(object, event) {
        var left = event.clientX - $(object).offset().left, width = $(object).width(), right = width - left;
        right = Math.min(Math.max(right, 0), width);
        return (right / width) * 100;
    };
    var options = options || {};
    var direction = options.dir || 'l';
    
    $(object).on('click', function(event) {
        var percent = (direction === 'r') ? getPercentRight(this, event) : getPercentLeft (this, event);
        $(this).find('.progress-bar').css({
            'width' : percent + '%'
        });
        if (options.changed){
            options.changed.call (percent);
        }
    });
};
