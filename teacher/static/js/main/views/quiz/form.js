define(['jquery', 'underscore', 'backbone', 'modelbinding', 
        'scripts/main/models/quiz/quiz',
        'text!scripts/main/templates/quiz/form.html', 
        'app',
        'scripts/main/views/quiz/question/list',
        'scripts/main/collections/quiz/question',
        'datePicker'
        ], function($, _, Backbone, ModelBinding, QuizModel, template, App, QuestionListView, Collection) {

    return Backbone.View.extend({
        /**
         *
         */
        template : _.template(template),
        $saveButtons  : null,
        $buttonsTitles : null,
        /**
         *
         */
        formBindings : {
            'change #about' : 'about',
            'change #max_attempts' : 'max_attempts',
            'change #explanation' : 'explanation',
            'change #note' : 'note',
            'change #display_type' : 'display_type',
            'change #in_grade' : 'in_grade',
            'change #is_timed' : 'is_timed',
        },
        /**
         *
         */
        events : {
            'click button.save' : 'save',
            'click button#add_question' : 'addSuggestion',
            'change #in_grade' : 'toggleInGrade',
            'change #is_timed' : 'toggleIsTimed',
            'click #back_list' : 'backList',
        },
        /**
         *
         */
        initialize : function(options) {
            _.bindAll(this, 'render', 'close', 'success', 'error', 'change');
            this.model.on('sync', this.success);
            this.model.on('change', this.change);
            this.model.on('error', this.error);
            if (App.Manager.setChapterId){
                App.Manager.setChapterId(this.model.get('chapter_id'));
            }
        },
        /**
         *
         */
        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$saveButtons = this.$el.find('button.save');
            this.$buttonsTitles = this.$el.find('button.save .title');
            this.responseListView = new QuestionListView ({collection : new Collection(this.model.get('questions')), $el : this.$el.find ('#quizz_question'), model : this.model });
            this.responseListView.render ();
            ModelBinding.bind(this);
            // validate 
            this.change ();
            this.starDate = new common.DateTimePicker(this.$el.find('#due_at_date_picker')[0],{
                change : $.proxy (function (date){
                    this.model.set ({'due_at' :  date} , {silent : true});
                }, this)
            });
            this.endDate  = new common.DateTimePicker(this.$el.find('#end_at_date_picker')[0],{
                change : $.proxy (function (date){
                    this.model.set ({'end_at' : date} , {silent : true});
                }, this)
            });
            if (!this.model.isNew()) {
                this.$buttonsTitles.html(MMC.tr('update'));
            }
            // 
            this.checkForSuggestions ();
            this.checkForInGrade (this.model.get('in_grade'));
        },
        /**
         * 
         */
        checkForInGrade : function (ingrade){
            if (!ingrade){
                this.$el.find('#graduation_view  input').attr({'disabled' : 'disabled'});
            }
            else {
                this.$el.find('#graduation_view  input').removeAttr('disabled');
                this.toggleIsTimed ();
            }
        },
        /**
         * 
         */
        toggleInGrade : function (e){
            var checked = e.currentTarget.checked ;
            this.checkForInGrade (checked);
        },
        /**
         * 
         */
        toggleIsTimed :function (){
            var checked = this.$el.find('#graduation_view input#is_timed').is(':checked');
            if (!checked){
                 this.$el.find('#graduation_view  input#duration').attr({'disabled' : 'disabled'});
            }
            else {
                this.$el.find('#graduation_view input#duration').removeAttr('disabled');
            }
        },
        /**
         * 
         */
        addSuggestion : function(event) {
            event.preventDefault ();
            this.responseListView.collection.add({quiz_id : this.model.get('id')});
        },
        /**
         * 
         */
        checkForSuggestions : function() {
            if (this.model.isNew()) {
                this.$el.find('#add_suggestion').attr('disabled','disabled');
            }
            else {
                this.$el.find('#add_suggestion').removeAttr('disabled');
            }
        },
        /**
         *
         */
        save : function(event) {
            event.preventDefault ();
            var $source = $(event.currentTarget);
            $source.spinButton('play');
            var release = $source.data('release') || false;
            var model = this.model;
            var errors = model.validateAttributes();
            var scope = this;
            if (!errors) {
                model.save({}, {
                    data : _.extend(model.toJSON(), {release : release }),
                    success : $.proxy(scope.success, scope, $source, model),
                    error : scope.error,
                    wait : true
                });
            } else {
                for (var key in errors) {
                    $(this.el).find('#error_' + key).html(errors[key]).show();
                    ;
                }
            }
        },
        /**
         *
         */
        success : function($source, model, response) {
            App.vent.trigger('alert', {
                msg : MMC.tr('the course \'1%\' has been successfully saved', this.model.get('title')),
                type : 'success'
            });
            this.$buttonsTitles.html(common.tr('Update'));
            $source.spinButton ('stop');
        },
        /**
         *
         */
        error : function(response) {
            App.vent.trigger('alert', {
                msg : response.message ? MMC.tr('response.message') : MMC.tr('an error has occurred, try again'),
                type : 'danger'
            });
        },
        /**
         *
         */
        change : function(model) {
            var valid = this.model.validateAttributes();
            var $saveButtons  = this.$saveButtons;
            if (!valid)
                $saveButtons.removeAttr('disabled');
            else 
                $saveButtons.attr ("disabled", "disabled");
        },
        /**
         * 
         */
        backList : function (e){
            e.preventDefault ();
            App.Manager.showQuizList(this.model, 'quiz');
        },
        /**
         *
         */
        close : function() {
            ModelBinding.unbind(this);
            this.model.off('sync', this.success);
            this.model.off('error', this.error);
            this.undelegateEvents();
            this.remove();
        },
    });
});
