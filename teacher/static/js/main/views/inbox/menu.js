define(['jquery', 'underscore', 'backbone', 'app', 'common'], function($, _, Backbone, App, common) {

    return Backbone.View.extend({
        /**
         *
         */
        id : null,
        /**
         *
         */
        events : {
            'click .side-menu-nav-item' : 'navigate',
        },
        /**
         *
         */
        initialize : function(main) {
            this.$el = main.$el.find('#app_inbox_lab_menu');
            this.lastItem = main.$el.find('a.active');
        },
        /**
         *
         */
        disable : function(e) {
            $('.side-menu-nav-item', this.$el).addClass('disabled');
        },
        /**
         *
         */
        navigate : function(event) {
            event.preventDefault();
            var source = event.currentTarget;
            var toActivate = $(source).attr('href');
            Backbone.history.navigate('inbox/'  + toActivate, true);
            this.hilightActiveItem(toActivate);
        },
        /**
         *
         */
        hilightActiveItem : function(active) {
            if (this.$lastItem)
                this.$lastItem.removeClass('active');
            var $current = this.$el.find('a[href="' + active + '"]');
            $current.addClass('active');
            this.$lastItem = $current;
        },
    });
});
