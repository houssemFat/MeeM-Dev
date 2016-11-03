// Use ECMAScript 5 Strict Mode
"use strict" ;
var host = __CONFIG__.hostUrl;

//  host : 'http://127.0.0.1:8080/work/apps/meemt/js', /*   apache */
// host : 'http://127.0.0.1:8082/static/js' /*  nginx :8082 FIXME */

// Common internal library
var common = host.replace('/static', '') + 'cjs/';

// common js for application
var commonApp = __CONFIG__.appCommoUrl;
/**
 *
 */
var require = {
    /**
     *
     */
    baseUrl : host + 'js/',
    /**
     *
     */
    waitSeconds : 0,
    /**
     *
     */
    paths : {
        /* jquery  */
        jquery : 'vender/jquery/jquery',
        /* jquery UI  */
        jqueryUI : 'vender/jquery/jquery-ui.min',
        /* jquery UI  */
        guiders : 'vender/guiders/jquery.joyride-1.0.5',
        /* jquery Easing  */
        jqueryEasing : 'vender/jquery/jquery.easing.min',
        /* jquery hotkeys  */
        jqueryHotKeys : 'vender/jquery/hotkeys',
        /* bootstrap  */
        bootstrap : 'vender/bootstrap/bootstrap.min',
        /* bootstrap  */
        bootstrapSlider : 'vender/bootstrap/bootstrap-slider.min',
        //
        moment : 'vender/utils/moment',
        /* wysihtml5  */
        wysieditor : 'vender/bootstrap-wysihtml5/bootstrap-wysihtml5',
        /* */
        wysihtml5 : 'vender/bootstrap-wysihtml5/wysihtml5-0.3.0',
        wysihtml5rules : 'vender/bootstrap-wysihtml5/rules',
        /* underscore  */
        underscore : 'vender/underscore/underscore',
         /* Backbone */
        backbone : 'vender/backbone/backbone',
        /* Bind Model  */
        modelbinding : 'vender/backbone/backbone.modelbinding',
        /**rivetsLib : 'vender/backbone/rivets',
        rivets : 'vender/backbone/rivets_conf',*/
        /* Mariontte  */
        marionette : 'vender/backbone/backbone.marionette',

        /* classie js */
        classie : 'vender/classie/classie',
        /* hmtl loading */
        text : 'vender/require/text',
        /* r.js */
        onLoad : 'empty:',
        //
        calendar : 'vender/calendar',
        //
        player : 'vender/player/player',
        // player plugins
        customPlayer : 'vender/player/custom',
        //
        calendarLang : 'vender/calendar/lang',
        //
        editor : 'assests/views/editor/editor',
        // 
        comment : 'assests/views/comment',
        // helper model #FIXME
        MVBinder : 'assests/tools/MVBinder',
        // helper model #FIXME
        helper : 'assests/tools/helper',
        
        spinButton : 'assests/tools/spinButton',
        // list helper #FIXME
        list : 'assests/views/list',
        // manager helper  #FIXME
        manager : 'assests/views/manager',

        /* MEEM common vender */
        common : common + 'common',
        commonWArabic : common + 'arabic.board',
        commonUpload : common + 'upload',
        commonWidget : common + 'widget',
        commonAutoc : common + 'autocomplete',
        /* */ 
        datePicker : common + 'dateTimePicker',

        /* common scripts  */
        app : __CONFIG__.scriptsUrl + '/app', 
        
        /* common scripts  */
        appLogin : commonApp + 'login',
        appAlert : commonApp + 'alert',
        appModal : commonApp + 'modal',
        appRegister : commonApp + 'register',

        /* common */
        scripts : __CONFIG__.scriptsUrl,
        
        
        /* Document driven dom */
        D3 : 'vender/graphics/d3.v3',
        /* 3d  js */
        THREE : 'vender/utils/three/three.min',
        THREEStats : 'vender/utils/three/stats',
        THREEObjParser : 'vender/utils/three/objloader',
        THREEOrbitController : 'vender/utils/three/orbitController',
        THREEDaeParser : 'vender/utils/three/daeLoader',
    },
    shim : {
        jqueryUI : {
            deps : ["jquery"],
        },
        jqueryEasing : {
            deps : ["jquery"],
        },
        underscore : {
            exports : '_'
        },
        helper : {
            exports : 'Helper'
        },
        backbone : {
            deps : ["underscore", "jquery"],
            exports : "Backbone"
        },
        marionette : {
            deps : ['backbone', 'spinButton']
        },
        bootstrap : {
            deps : ['jquery', 'jqueryUI']
        },
        common : {
            deps : ['jquery'],
            exports : "common"
        },
        commonWidget : {
            deps : ['common']
        },
        commonUpload : {
            deps : ['commonWidget', 'common']
        },
        commonAutoc : {
            deps : ['commonWidget', 'common']
        },
        commonWArabic : {
            deps : ['jquery', 'jqueryUI', 'commonWidget', 'common']
        },

        THREEObjParser : {
            deps : ['THREE']
        },
        THREEOrbitController : {
            deps : ['THREE']
        },
        THREEDaeParser : {
            deps : ['THREE']
        },
        calendar : {
            deps : ['jquery', 'jqueryUI', 'moment']
        },
        datePicker : {
            deps : ['jquery', 'underscore', 'moment']
        },
        wysieditor : {
            deps : ['wysihtml5', 'wysihtml5rules']
        },
        rivets : {
            deps : ['rivetsLib']
        },
        editor : {
            deps : ['jquery', 'jqueryHotKeys', 'wysieditor']
        },
        customPlayer : {
            deps : ['player']
        },
    },
};
