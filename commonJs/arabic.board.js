/**
 * arabic.borad.js v0.0.1 by fathallah houssem
 * Copyright 2014 MeeM.
 * MIT , unlimited under respect !!!
 */
if (!jQuery) {
    throw new Error("arabic key board  requires jQuery");
};'use strict';
var isMozzila = navigator.userAgent.indexOf('Firefox') > -1;
/**
 * @constructor
 */
(function($) {
    var iktebHTML = '<div id="arabic_key_board" style="z-index:999999;display:none  ">  <div style="text-align:right" id="key_board_header">  <span  id="mobile_symbol_screen" class="key-state-idle key-state hand"><i class="icon-th-large"></i></span> ' + '<span  id="20" class="key-state-idle key-state hand">? <i class="icon-th"></i></span> <span  id="17" class="key-state key-state-idle hand"> <i class=" icon-arrow-up"></i></span> <span  id="arabic_key_board_hide" class="app-hand">إخفاء</span> ' + '</div>' + '<div class="row-fluid text-center" id="default_keys_container">' + ' <input type="button" class="keyboard keys-symbol" id="222" />' + '<input type="button" class="keyboard keys-symbol" id="49"/>' + '<input type="button" class="keyboard keys-symbol" id="50"/>' + '<input type="button" class="keyboard keys-symbol" id="52"/>' + '<input type="button" class="keyboard keys-symbol" id="53"/>' + '<input type="button" class="keyboard keys-symbol" id="54"/>' + '<input type="button" class="keyboard keys-symbol" id="55"/>' + '<input type="button" class="keyboard keys-symbol" id="56"/>' + '<input type="button" class="keyboard keys-symbol" id="57"/>' + '<input type="button" class="keyboard keys-symbol" id="48"/>' + '<input type="button" class="keyboard keys-symbol" id="219"/>' + '<input type="button" class="keyboard keys-symbol" id="187"/>' + ' <input type="button" class="keyboard" value="←" style="width: 56px !important;" id="8"/>' + '<br class="key-board-large-screen">' + '<input type="button" class="keyboard keys-char" id="65">' + '<input type="button" class="keyboard keys-char" id="90"/>' + '<input type="button" class="keyboard keys-char" id="69" />' + '<input type="button" class="keyboard keys-char" id="82" />' + '<input type="button" class="keyboard keys-char" id="84" />' + '<input type="button" class="keyboard keys-char" id="89" />' + '<input type="button" class="keyboard keys-char" id="85"/>' + '<input type="button" class="keyboard keys-char" id="73"/>' + '<input type="button" class="keyboard keys-char" id="79" />' + '<input type="button" class="keyboard keys-char" id="80" />' + '<input type="button" class="keyboard keys-char" id="221" />' + '<input type="button" class="keyboard keys-char" id="186" />' + '<input type="button" class="keyboard" style="width: 48px !important;" value="↲" id="13"/><br class="key-board-large-screen">' + '<input type="button" class="keyboard keys-char" id="81"/>' + '<input type="button" class="keyboard keys-char" id="83"/>' + '<input type="button" class="keyboard keys-char" id="68"/>' + '<input type="button" class="keyboard keys-char" id="70"/>' + '<input type="button" class="keyboard keys-char" id="71"/>' + '<input type="button" class="keyboard keys-char" id="72"/>' + '<input type="button" class="keyboard keys-char" id="74"/>' + '<input type="button" class="keyboard keys-char" id="75"/>' + '<input type="button" class="keyboard keys-char" id="76"/>' + '<input type="button" class="keyboard keys-char" id="77"/>' + '<input type="button" class="keyboard keys-char" id="192"/>' + ' <input type="button" class="keyboard keys-char" id="220"/><br class="key-board-large-screen">' + '<input type="button" class="keyboard keys-char" id="226"/>' + '<input type="button" class="keyboard keys-char" id="87"/>' + '<input type="button" class="keyboard keys-char" id="88"/>' + '<input type="button" class="keyboard keys-char" id="67"/>' + '<input type="button" class="keyboard keys-char" id="86"/>' + '<input type="button" class="keyboard keys-char" id="66"/>' + '  <input type="button" class="keyboard keys-char" id="78"/>' + ' <input type="button" class="keyboard keys-char" id="188"/>' + ' <input type="button" class="keyboard keys-symbol" id="190"/>' + ' <input type="button" class="keyboard keys-symbol" id="191"/>' + ' <input type="button" class="keyboard keys-symbol" id="223"/><br class="key-board-large-screen">' + '<input type="button" class="keyboard keys-char key-espace" value="" id="32"/>' + ' </div>' + '</div>';
    var isShift_ = false;
    var isCap_ = false;
    var specialKeys_ = [];
    var keyboard = $(iktebHTML);
    var activeTarget = null;
    var _keysToJump = ['8', '116', '17', '16', '13'];
    var STATES = ['S'/*symboles*/, 'N'/*numeric*/, 'L' /*letters*/];
    var defaultOptions = {};
    var currentType = null;
    var KEYS = {
        32 : {
            l : ' ',
            u : ' '
        },
        48 : {
            l : 'ُ',
            u : '0'
        },
        49 : {
            l : '‟',
            u : '1'
        },
        50 : {
            l : '”',
            u : '2'
        },
        51 : {
            l : '«',
            u : '3'
        },
        52 : {
            l : '»',
            u : '4'
        },
        53 : {
            l : 'ا',
            u : '5'
        },
        54 : {
            l : 'ً',
            u : '6'
        },
        55 : {
            l : 'ْ',
            u : '7'
        },
        56 : {
            l : 'ّ',
            u : '8'
        },
        57 : {
            l : 'ِ',
            u : '9'
        },
        65 : {
            l : 'ض',
            u : '۰'
        },
        66 : {
            l : 'ز',
            u : '%'
        },
        67 : {
            l : 'و',
            u : '&'
        },
        68 : {
            l : 'ي',
            u : '€'
        },
        69 : {
            l : 'ث',
            u : '۲'
        },
        70 : {
            l : 'ب',
            u : ']'
        },
        71 : {
            l : 'ل',
            u : '['
        },
        72 : {
            l : 'ا',
            u : '#'
        },
        73 : {
            l : 'ه',
            u : '۸'
        },
        74 : {
            l : 'ت',
            u : 'أ'
        },
        75 : {
            l : 'ن',
            u : 'إ'
        },
        76 : {
            l : 'م',
            u : 'ئ'
        },
        77 : {
            l : 'ك',
            u : 'ؤ'
        },
        78 : {
            l : 'ى',
            u : '؟'
        },
        79 : {
            l : 'خ',
            u : '۹'
        },
        80 : {
            l : 'ح',
            u : '¤'
        },
        81 : {
            l : 'ش',
            u : '\''
        },
        82 : {
            l : 'ق',
            u : '۳'
        },
        83 : {
            l : 'س',
            u : '$'
        },
        84 : {
            l : 'ف',
            u : '۵'
        },
        85 : {
            l : 'ع',
            u : '۷'
        },
        86 : {
            l : 'ر',
            u : '|'
        },
        87 : {
            l : 'ذ',
            u : '>'
        },
        88 : {
            l : 'ء',
            u : '@'
        },
        89 : {
            l : 'غ',
            u : '۴'
        },
        90 : {
            l : 'ص',
            u : '۱'
        },
        186 : {
            l : 'د',
            u : '£'
        },
        187 : {
            l : 'ٍ',
            u : '+'
        },
        188 : {
            l : 'ة',
            u : '?'
        },
        190 : {
            l : '٬',
            u : '‚'
        },
        191 : {
            l : '\'',
            u : '.'
        },
        192 : {
            l : 'ط',
            u : 'ؤ'
        },
        219 : {
            l : 'َ',
            u : '°'
        },
        220 : {
            l : 'ظ',
            u : 'لا'
        },
        221 : {
            l : 'ج',
            u : '^'
        },
        222 : {
            l : '"',
            u : '²'
        },
        223 : {
            l : '.',
            u : '!'
        },
        226 : {
            l : 'ﭫ',
            u : '<'
        },
        8 : {
            l : '←',
            u : '←'
        },
        13 : {
            l : '↲',
            u : '↲'
        }
    };
    /**
     * append character to current target
     * @param {HTMLInputElement||HTMLTextAreaElement} target
     *           target text zone destination
     * @param {string} character character to append
     */
    function appendCharacter(target, character) {
        // split the source into two parts
        var positions ;
        if (currentType === "contentEditable"){
            positions = getIframeCaretPosition(target);
            var start = positions.start, end = positions.end;
            $(target).html(end + character + start);
            //positions.node = end + character + start;
            $(target).keydown().keypress().keyup().focus();
            var _window = positions.window;;
            var _document = _window.document; // _document.createRange() if not using Rangy
            var sel = _window.getSelection();
            var range = _document.createRange() ;
            range.setStart(positions.node, end.length + 1);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        else {
            positions = getPostions(target);
            var start = positions.start, end = positions.end;
            // append the character and fire all related events
            $(target).val(end + character + start).keydown().keypress().keyup();// update the caret position
            moveCaretTo(target, end.length + 1);
        }
        
    };
    /**
     *
     */
    function getIframeCaretPosition(target) {
        if (window.getSelection && window.getSelection().getRangeAt) {
            // assume that this target is inside an iframe
            // $(target).closest('html').parent()[0].defaultView.getSelection ()
            $target = $(target);
            var _window = $target.closest('html').parent()[0].defaultView;
            var range = _window.getSelection ().getRangeAt(0);
            var selectedObj = _window.getSelection();
            var rangeCount = 0;
            var childNodes = selectedObj.anchorNode.parentNode.childNodes;
            /*for (var i = 0; i < childNodes.length; i++) {
                if (childNodes[i] == selectedObj.anchorNode) {
                    break;
                }
                if (childNodes[i].outerHTML)
                    rangeCount += childNodes[i].outerHTML.length;
                else if (childNodes[i].nodeType == 3) {
                    rangeCount += childNodes[i].textContent.length;
                }
            }
            */
            var start = range.startOffset + rangeCount;
            return {
                start : $target.html().substr(start),
                end : $target.html().substr(0, start),
                window : _window,
                node : selectedObj.anchorNode
            };  
        }
        return -1;
    }

    // var el = document.getElementById("foo");
    // selectElementContents(el);
    /**
     * append character to current target
     * @param {HTMLInputElement||HTMLTextAreaElement} target
     *           target text zone destination
     * @param {string} character character to append
     */
    function getPostions(target) {
        if (!isMozzila)
            target.setRangeText('');
        else
            target.setSelectionRange('');
        return {
            start : target.val().substr(target.selectionStart),
            end : target.val().substr(0, target.selectionStart)
        };
    }

    /**
     *
     */
    function configure() {
        if ($('footer').length > 0) {
            keyboard.insertBefore('footer');
        } else {
            keyboard.appendTo('body');
        }
        $(keyboard).css({
            top : '',
            left : ''
        });
        /**
         * Connect draggable function
         */
        $(keyboard).draggable({
            drag : function(event, ui) {
                var object = ui.helper.context;
            }
        }).click(
        /**
         * Stop the event propagation (prevent hiding the main board)
         * @param {event} event
         */
        function(event) {
            event.stopPropagation();
        });
        /**
         * Connect cap event
         */
        $('#20:eq(0)', keyboard).click(
        /**
         * Manage code for cap key
         * @param {event} event
         */
        function(event) {
            context.manageCodes(20, event, true);
        }).each(function() {
            specialKeys_.push(this);
        });
        ;
        /**
         * Connect key board_ inputs
         */
        $('.keyboard', keyboard).each(
        /**
         * Click on the input
         */
        function() {
            var id = this.id;
            KEYS[id]['object'] = this;
            this.value = KEYS[id].l;
        }).click(
        /**
         * Handle the click event on the button
         * @param {event} event
         */
        function(event) {
            manageCodes(this.id, event || window.event, true);
            event.stopPropagation();
        });
        // shift key
        {
            /**
             * Connect shif key inputs
             */
            $('#17', keyboard).click(
            /**
             * Handle the click event on the button
             * @param {event} event
             */
            function(event) {
                isShift_ = !isShift_;
                var isShift = isShift_;
                switchKeyBoardToCap(event);
                event.stopPropagation();
                switchState($(this), isShift);
                //common.switchIconState($(this), isShift);
            }).each(function() {
                specialKeys_.push(this);
            });
        }
        /**
         * connect hide key board_ button
         */
        $('#arabic_key_board_hide:eq(0)', keyboard).click(
        /**
         * Handle the onclick event of hide ket board
         */
        function() {
            disable();
        });

        /**
         * Connect all input with class
         */
        $(document).off('focusin').on('focusin', '.write-arabic', function() {
            enable(this);
        });
        /*
         {
         *
         *
         *
         $('#switch_state').click(function() {
         var active = false ;
         if (context.writeMethod_ === 'key'){
         $(context.touchBoard_).show ();
         $(context.keyBoard_).hide ();
         context.writeMethod_ = 'touch';
         active = true ;
         }
         else{
         $(context.touchBoard_).hide ();
         $(context.keyBoard_).show ();
         context.writeMethod_ = 'key';
         }
         context.switchState($(this), active);
         common.switchIconState ($(this), active);
         }
         );
         }*/
        $(document).on('click', '.ikteb', function() {
            var type = $(this).attr('ikteb-type');
            enable($($(this).attr('ikteb-target'))[0]);
        });
        $('#mobile_symbol_screen').click(function() {
            var state = this.__appClickToggleState;
            $('.keys-char', keyboard)[state ? 'show' : 'hide']();
            $('.keys-symbol', keyboard)[!state ? 'show' : 'hide']();
            //common.switchIconState($(this), !state);
            this.__appClickToggleState = !this.__appClickToggleState;
        });
    }

    /**
     * Prevents the event propagation
     * @param {Event} event
     */
    function stopEvent(event) {
        if (event.preventDefault)
            event.preventDefault();
        // Standard technique
        if (event.returnValue)
            event.returnValue = false;
    };

    /**
     *
     */
    function fireKey(source, target, event) {
        // get the character in the saved objects
        var key = getState(event), id = source.id;
        // delete Code
        if (id === '8') {
            clearText(target, event);
        }
        // enter Key
        else if (id === '13') {
            appendCharacter(target, '\n');
        } else {
            // append the value
            appendCharacter(target, KEYS[id][key]);
        }
        // change the color of current key
        setColor(source, Object(key));
    };
    /**
     *
     */
    function getState(event) {
        // get current key type
        var state = ( isCap_ ? 'u' : 'l'), shift = isShift_;
        // || (event || window.event).shiftKey;
        // inverse the situation in shift mode
        if (shift)
            state = (!isCap_ ? 'u' : 'l');
        return state;
    };
    /**
     * this function execute when the user press 'Del' button
     * @param  {HTMLInputElement||HTMLTextAreaElement} target
     */
    function clearText(target) {
        // get the caret position
        if (!isMozzila)
            target.setRangeText('');
        // split the source into two parts
        var start = target.value.substr(target.selectionStart), end = target.value.substr(0, target.selectionStart);
        // remove designed character and fire all related events
        $(target)[currentType === "contentEditable" ? 'html' : 'val'](end.substr(0, end.length - 1) + start).keydown().keypress().keyup();
        moveCaretTo(target, end.length - 1);
    };
    /**
     * Move the caret to designed position
     * @param {HTMLInputElement||HTMLTextAreaElement} object target
     * @param {number} position position to move to
     */
    function moveCaretTo(object, position) {
        // For internet explorer
        if (object.setSelectionRange) {
            object.focus();
            object.setSelectionRange(position, position);
        }
        // For others
        else if (object.createTextRange) {
            var range = object.createTextRange();
            range.collapse(true);
            range.moveEnd('character', position);
            range.moveStart('character', position);
            range.select();
        }
    };
    /**
     * Simulate the click on key down or change color on click
     * @param {HTMLObjectElement} input
     * @param {Object} code
     */
    function setColor(input, code) {
        $(input).css({
            backgroundColor : 'orange'
        });
        setTimeout(function() {
            $(input).css({
                backgroundColor : ''
            });
        }, 250);
    };
    /**
     *
     * @param {Event} event
     */
    function handleKey(event) {
        var e = event || window.event;
        //this.isShift_ = e.shiftKey;
        manageCodes(e.keyCode, e, false);
    };
    /**
     * Switch the key board state to lower, capital states
     * @param {Event} event
     */
    function switchKeyBoardToCap(event) {
        var key = getState(event);
        $('.keyboard', keyboard).each(function() {
            this.value = KEYS[this.id][key];
        });
    };
    /**
     * Main function of the merary, it set the \
     * correspondent values switch codes
     * @param {number} keyCode code of current key (pressed) or button clicked
     * @param {Event} event the event window
     * @param {boolean} click indicates weather the
     * source is the htmlElement Object or a key event
     */
    function manageCodes(keyCode, event, click) {
        var code = String(keyCode), target = activeTarget, e = event || window.event;
        if (code === '27') {
            this.disable();
            return;
        }
        // Change display to capital keys
        if (code === '20') {
            isCap_ = !isCap_;
            var state = isCap_;
            $capKey = $('#20:eq(0)', keyboard);
            switchState($capKey, state);
            //common.switchIconState($capKey, state);
            switchKeyBoardToCap(e);
            return;
        }
        // Change shift
        if (code === '17' || code === '16') {
            isShift_ = !isShift_;
            var state = isShift_;
            $shift = $('#17:eq(0)', keyboard);
            switchState($shift, state);
            //common.switchIconState($shift, state);
            switchKeyBoardToCap(e);
            return;
        }
        //
        if (click) {
            //.click(e);// IE
            stopEvent(e);
        }
        if (!e.ctrlKey) {
            if (KEYS[code]) {
                if (!click) {
                    stopEvent(e);
                }
                fireKey(KEYS[code].object, target, e);
            }
        }
    };
    /**
     *
     * @param icon
     */
    function switchState($button, state) {
        var prefix = 'key-state-', toggle = prefix + ( state ? 'active' : 'idle') + ' ' + prefix + ( state ? 'idle' : 'active');
        $button.toggleClass(toggle);
    };
    /**
     *  Activates the arabic key board_
     * @param {HTMLInputElement||HTMLTextAreaElement} target
     */
    function enable(target, type) {
        if (!target)
            return;
        $(keyboard).css({
            'left' : '0px',
            'top' : '0px'
        });
        var halfWidth = $(keyboard).innerWidth() / 6, $target = $(target);
        if (!type)
            $target.show();
        $target.css({
            'direction' : 'rtl'
        }).select();
        var offset = $target.offset(), height = $target.innerHeight(), boardHeight = $(keyboard).innerHeight(), top = offset.top - boardHeight;
        if (top < 0)
            top = offset.top + height + 5;
        // calculate the position
        // $(object).css ({'height' : $(object).innerHeight() + 'px'});
        $(keyboard).css({
            'left' : (offset.left - halfWidth) + 'px',
            'top' : top + 'px'
        }).show();

        /*common.Widget.addToWidgets(keyboard,

         * Function to handle after the widget is closed
         *
         function() {
         $(document).unbind('keydown', $.proxy(context.handleKey, context));
         });*/
        $(document).unbind('keydown').bind('keydown', handleKey);

        currentType = type;
        activeTarget = target;
    };
    /**
     * Disable the key board_ .
     */
    function disable() {
        $(keyboard).hide();
        $(document).unbind('keydown', handleKey);
        if (currentType ==='contentEditable')
            $(activeTarget).unbind('keydown', handleKey);
        
    }

    /**
     *
     */
    var Ikteb = function(object, options) {
        options = options || {};
        if (options.type)
            this.type = options.type;
        this.target = options.target ? options.target : $($(object).attr('ikteb-target'))[0];
        var scope = this;
        $(object).click($.proxy(function() {
            enable(this.target, this.type);
            if (this.type === 'contentEditable'){
                  $(this.target).unbind('keydown').bind('keydown', handleKey);
            }
        }, scope));
        
    };

    /**
     * init the key board_
     */
    Ikteb.prototype = {
        type : null,
        target : null,
    };
    /**
     *
     * @type {Array}
     * @static
     */

    /**
     *
     * @type {{}}
     */

    /**
     *
     * @param {Object} option
     */
    $.fn.ikteb = function(options) {
        new Ikteb(this, options);
    };
    $.fn.ikteb.Constructor = Ikteb;
    $.fn.ikteb.VERSION = '0.0.1';
    configure();
})(window.jQuery);
