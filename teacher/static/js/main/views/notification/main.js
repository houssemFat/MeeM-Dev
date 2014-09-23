define(['jquery', 
        'underscore', 
        'backbone'], function($, _, Backbone) {
    return Backbone.View.extend({
        /**
         * 
         */
        el : '#notifcation_btn',
        /**
         * 
         */
        $bell : null,
        /**
         * 
         */
        initialize : function (){
            this.$bell = this.$el.find ('i.fa-bell-o');
        },
        /**
         * 
         */
        notify : function (){
            this.$bell.addClass('dance');
            var scope = this ;
            setTimeout (function (){
                scope.$bell.removeClass('dance');
            }, 3000);
        },
        /*
         *
         * @param {Object} event
         */
        close : function(event) {
            this.$el.find('#count').remove();
        }
    });
});
