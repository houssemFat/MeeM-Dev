define(['jquery', 'underscore', 'backbone', 'app', 'scripts/main/views/tour/list', 'common'], function($, _, Backbone, App, ToorListView, common) {

    return Backbone.View.extend({
        /**
         *
         */
        el : '#app_teacher_menu_container',
        /**
         *
         */
        currentTab : null,
        /**
         *
         */
        currentTabNav : null,
        /**
         *
         */
        tabs : {},
        /**
         *
         */
        $topNavBar : $('li#top_nav_items'),
        /**
         *
         */
        className : 'col-md-12 col-sm-4 col-lg-3',
        /**
         *
         */
        initialize : function() {
            var scope = this;
            _.bindAll(this, 'bodyScroll');
            $('div.nav', this.$el).each(function() {
                scope.tabs[$(this).find('a').attr('href')] = this;
            });
            $('a', this.$topNavBar[0]).click(function(e) {
                e.preventDefault();
                scope.navigate($(e.currentTarget));
            });
            var tours = [{
                idElement : 'dashboard_nav',
                id : "dashboard", 
                dataOptions : 'tipLocation:top right;',
                title : common.tr('dashboard'),
                description : common.tr ('tour.dashboard')
            }, {
                idElement : 'courses_nav',
                id : "courses",
                dataOptions : "",
                title : common.tr('Courses'),
                description : common.tr ('tour.courses')
            }, {
                idElement : 'collaboration_nav',
                id : "collaboration",
                dataOptions : "",
                title : common.tr('staff'),
                description : common.tr ('tour.collaborators')
            }, {
                    idElement : 'inbox_nav',
                    id : "inbox",
                    dataOptions : 'tipLocation:top left;',
                    title : common.tr('inbox'),
                    description : common.tr ('tour.inbox')
            }];
            App.toursListView = new ToorListView({
                collection : new Backbone.Collection(tours)
            });
            App.toursListView.render();
        },
        /**
         *
         */
        events : {
            'click .nav' : 'navigateFromTab',
            'click #new_course' : 'CreateNew',
        },
        /**
         *
         */
        navigateFromTab : function(event) {
            event.preventDefault();
            this.navigate($(event.currentTarget).find('a'));
        },
        /**
         *
         */
        navigate : function($source) {
            Backbone.history.navigate($source.attr('href'), true);
        },
        /**
         *
         */
        bodyScroll : function(event) {
            if (window.document.body.scrollTop > 40) {
                this.$topNavBar.show();
            } else {
                this.$topNavBar.hide();
            }
        },
        /**
         *
         */
        hide : function() {
            $(window).unbind('scorll', this.bodyScroll);
            this.$el.hide ();
            this.$topNavBar.hide ();
            this.$el.addClass ('hidden');
        },
        /**
         *
         */
        show : function() {
            $(window).unbind('scorll', this.scrollFn).bind('scroll', this.bodyScroll);
            this.$el.removeClass ('hidden');
        },
        /**
         *
         */
        activeTab : function(tabId) {
            $(this.currentTab).removeClass('active');
            this.currentTab = this.tabs[tabId];
            $(this.currentTab).addClass('active');

            $(this.currentTabNav).removeClass('active');
            var $topNavItem = this.$topNavBar.find('a[href="' + tabId + '"]');
            this.currentTabNav = $topNavItem;
            this.currentTabNav.addClass('active');
        },
        /**
         *
         * @param {Object} e
         */
        CreateNew : function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            Backbone.history.navigate('course/new', true);
        },
    });
});
