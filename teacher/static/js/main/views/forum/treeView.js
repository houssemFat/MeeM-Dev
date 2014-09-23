define(['jquery', 'underscore', 'backbone', 'text!scripts/main/templates/forum/list.html', 'scripts/main/views/forum/treeViewCollection', 'scripts/main/collections/forum', 'editor', 'app'], function($, _, Backbone, template, TreeViewCollection, Collection, Editor, App) {
    var TreeRoot = Backbone.View.extend({
        template : _.template(template),
        initialize : function(comments) {
            this.$el.html(this.template());
            var $commentArea = this.$el.find('#compose:eq(0)');

            this.$commentEditor = $commentArea.closest('div');
            var treeView = new TreeViewCollection({
                collection : new Collection(comments),
                $el : this.$el.find('#comments_body'),

            });
            App.Editor = new Editor($commentArea, {
                events : {

                },
                scope : this
            });
            treeView.render({ });
        },
    });
    return TreeRoot;
});
