var comments = [{
    text : "top level 1",
    comments : [{
        text : "2nd level, item 1",
        comments : [{
            text : "3rd level, item 1"
        }, {
            text : "3rd level, item 2"
        }, {
            text : "3rd level, item 3"
        }]
    }, {
        text : "2nd level, item 2",
        comments : [{
            text : "3rd level, item 4"
        }, {
            text : "3rd level, item 5",
            comments : [{
                text : "4th level, item 1"
            }, {
                text : "4th level, item 2"
            }, {
                text : "4th level, item 3"
            }]
        }, {
            text : "3rd level, item 6"
        }]
    }]
}, {
    text : "top level 2",
    comments : [{
        text : "2nd level, item 3",
        comments : [{
            text : "3rd level, item 7"
        }, {
            text : "3rd level, item 8"
        }, {
            text : "3rd level, item 9"
        }]
    }, {
        text : "2nd level, item 4",
        comments : [{
            text : "3rd level, item 10"
        }, {
            text : "3rd level, item 11"
        }, {
            text : "3rd level, item 12"
        }]
    }]
}];
define(['jquery', 'underscore', 'backbone', 'app', 'customPlayer', 'scripts/main/collections/question', 'scripts/main/views/question/list', 'text!scripts/main/templates/chapter/view.html', 'scripts/main/collections/comment', 'scripts/main/views/forum/treeView'], function($, _, Backbone, App, player, QuestionCollection, QuestionListView, template, CommentCollection, CommentListView) {
    var Chapter = Backbone.View.extend({
        /**
         *
         */
        initialize : function() {
            this.template = _.template(template || "");
        },
        /**
         *
         */
        events : {
            "click .close-modal" : "destroy",
            "click .submit-comment" : "postComment"
        },

        /**
         *
         */
        counter : 45,
        /**
         *
         */
        counterHTML : null,
        /**
         *
         */
        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            common.loadCss('/ccss/video-player/player.css');
            videojs(this.$el.find('#video_player')[0], {
                plugins : {
                    'timeUpdatePlugin' : {
                        fn : this.progressVideoFn,
                        scope : this
                    },
                },

            }, function() {
                // This is functionally the same as the previous example.
            });

            var collection = new QuestionCollection(this.model.get('qcm_questions')), questionListView = new QuestionListView({
                collection : collection,
                $container : this.$el
            });

            questionListView.chapterParent = this;
            questionListView.render();
            this.questionListView = questionListView;
            this.counterHTML = this.$el.find('.app-chapter-counter').find('span');
            /**
             *
             */
            var commentsView = new CommentListView({
                collection : new CommentCollection(comments, {
                    id : this.model.get('id')
                }),
                content : this.$el
            });
            commentsView.render();
            this.$el.find('#comments_view').append(commentsView.el);
            return this;
        },
        /**
         *
         */
        postComment : function(source) {

        },
        /**
         *
         */
        successComment : function(source, response) {
            this.$commentBody_.val('');
            $(source).button('loading');
            $(source).button('enable');
            $(this.lastFiredComment_).find('#in_library_count:eq(0)').html(response.count);
            Lib.Widget.hideModal();
        },
        /**
         *
         */
        errorComment : function(source, response) {
            this.$commentBody_.val('');
            $(source).button('loading');
            $(source).button('enable');
            Lib.Widget.hideModal();
        },
        /**
         *
         */
        destroy : function() {
            this.videoPlayer.destroy();
            this.remove();
            Backbone.history.navigate('/#', true);
        },
        /**
         *
         * @param {Object} time
         * @param {Object} total
         */
        progressFn : function(time, total) {
            var value = (time / total) * 100;
            this.questionListView.checkQuestions(value);
            this.counterHTML.html(this.counter + Math.round(value)).animate('show', 100);
        },

        /**
         *
         * @param {Object} time
         * @param {Object} total
         */
        readyView : function(container, player) {

        },
        /**
         *
         */
        loadComments : function() {

        },
        /**
         * 
         */
        close : function() {
            this.remove();
        }
    });
    return Chapter;
}); 