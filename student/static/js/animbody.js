define([
  'jquery',
  'jqueryEasing',
  'bootstrap',
  'classie',
], function(jquery, jqeuryEasing, bootstrap, classie) {


// jQuery for page scrolling feature - requires jQuery Easing plugin

/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {

    var docElem = document.documentElement,
        header = document.querySelector( '.navbar-fixed-top' ),
        topSection = document.querySelector( '.section-top' ),
        didScroll = false,
        changeHeaderOn = 300;

    function init() {
        window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 250 );
            }
        }, false );
    }

    function scrollPage() {
        var sy = scrollY();
        if ( sy >= changeHeaderOn ) {
            classie.add( header, 'navbar-shrink' );
            if (topSection)
                classie.remove( topSection, 'section-top-shrink' );
        }
        else {
            classie.remove( header, 'navbar-shrink' );
            if (topSection)
                classie.add( topSection, 'section-top-shrink' );
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }
    init();
    // add first loading checking
    scrollPage ();

})();

});