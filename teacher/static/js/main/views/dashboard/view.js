define(['jquery', 'underscore', 'backbone', 'app', 'text!scripts/main/templates/dashboard/view.html', 'scripts/main/views/dashboard/history/list' ,  'scripts/main/views/dashboard/todo/list'], function($, _, Backbone, App, template, HistoryListView, ToDoListView) {

    return Backbone.View.extend({
        /**
         *
         */
        events : {
            "click #courses" : "ViewCourses",
            "click #tasks" : "ViewTasks",
            "click #inbox" : "ViewInbox",
            "click #staff" : "ViewStaff",
            "click #profile" : "ViewProfile",
        },
        template : _.template(template),
        /**
         *
         * @param {Object} options
         */
        initialize : function(options) {
            this.$el.html(this.template(this.model.toJSON()));
        },
        /**
         *
         */
        render : function() {
            var recents  = this.model.get('history');
            var historyListView = new HistoryListView({collection : new Backbone.Collection (recents), $el : this.$el.find('#recent_history')});
            historyListView.render ();
            this.historyListView = historyListView ;
            var todo  = this.model.get('todos');
            var todoListView = new ToDoListView({collection : new Backbone.Collection (todo), $el : this.$el.find('#todo_list')});
            todoListView.render ();
            this.todoListView = todoListView ;
        },
        /**
         *
         */
        ViewCourses : function(event) {
            event.preventDefault();
            Backbone.history.navigate('course/list', true);
        },

        /**
         *
         */
        ViewInbox : function(event) {
            event.preventDefault();
            Backbone.history.navigate('inbox/', true);
        },
        /**
         *
         */
        ViewTasks : function(event) {
            event.preventDefault();
            Backbone.history.navigate('collaboration/tasks', true);
        },
        /**
         *
         */
        ViewProfile : function(event) {
            event.preventDefault();
            Backbone.history.navigate('profile', true);
        },
        /**
         *
         */
        ViewStaff : function(event) {
            event.preventDefault();
            Backbone.history.navigate('collaboration/teams', true);
        },
        /**
         *
         */
        close : function() {
            this.undelegateEvents();
            this.remove();
        },
    });
});
