define(['jquery', 'underscore', 'backbone', 'app',   'modelbinding', 'text!scripts/main/templates/quiz/question/item.html', 'scripts/main/collections/quiz/response', 'scripts/main/views/quiz/response/list'], function($, _, Backbone, App, ModelBinding, template, ResponseCollection, ResponseListView) {
    return Backbone.View.extend({
        /**
         * 
         */
        tagName : 'li',
        className : 'row',
        /**
         *
         */
        template : _.template(template || ""),
        /**
         *
         */
        formBindings : {
            'change #question' : 'question',
            'change #help' : 'help',
            'change #with_input' : 'with_input',
            'change #max_attempts' : 'max_attempts',
            'change #note' : 'note',
            'change #question_type' : 'question_type',
        },
        /**
         *
         */
        events : {
            'change #question_type' : 'changeQuestionType',
            'change input#question' : 'updateTitleQuestion',
            'keyup #add_new_item' : 'addResponseFromInput',
            'click #add_new_btn' : 'addResponseItem',
            'click #edit_question' : 'editQuestion',
            'click #save_question' : 'saveQuestion',
            'click #delete_question' : 'deleteQuestion',
        },
        /**
         *
         */
        initialize : function() {
            this.$el.html(this.template(this.model.toJSON()));
            var $responseContainer = this.$el.find("#response_list");
            this.responseListView = new ResponseListView({
                collection : new ResponseCollection(this.model.get('responses')),
                $el : $responseContainer,
                choiceType : this.model.get('question_type')
            });
            _.bindAll(this, 'showSaveButton', 'editQuestion');
            // attach on change for each model of response
            this.responseListView.collection.on('model:changed', this.showSaveButton);
            this.responseListView.collection.on('model:added', this.showSaveButton);
            this.responseListView.renderCollection ();
            ModelBinding.bind(this);
            
            // attach model to current model of response
            this.model.on('change', this.showSaveButton);
            this.$newSourceValue = this.$el.find("#add_new_item");
            this.$el.attr('id', 'order_' + String(this.model.get('order')) );
            if (this.model.isNew()){
                this.editQuestion();
            }
        },
        /**
         * 
         */
        updateTitleQuestion : function (event){
            this.$el.find ('#question_title').html(event.currentTarget.value);
        },
        /**
         * 
         */
        showSaveButton : function (){
            this.$el.find('#save_question').show();  
        },
        /**
         *
         */
        changeQuestionType : function(e) {
            var select = e.currentTarget;
            var type = select[select.selectedIndex].value;
            if (type == "multiple") {
                this.responseListView.collection.trigger("question:type:change", 'multiple');
            } else if (type == "unique") {
                this.responseListView.collection.trigger("question:type:change", 'unique');
            }
        },
        /**
         * 
         */
        editQuestion : function (){
            this.$el.find('#item_details').show(); 
        },
        /**
         * 
         */
        saveQuestion : function (){
            event.preventDefault();
            var model = this.model;
            var check = model.validateAttributes();
            var scope = this;
            if (check === null) {
                var data = model.toJSON() ;
                var response = [];
                _.each(this.responseListView.collection.models, function (model){
                    response.push (model.toJSON());
                });
                model.save({}, {
                    data : $.extend(true, data, {responses : JSON.stringify (response) }),
                    success : $.proxy(scope.success, scope),
                    error : scope.error,
                    wait : true
                });
            } else {
                for (var key in check) {
                    this.$el.find('#' + key).parent().addClass('has-error');
                }
            }
        },
        /**
         * 
         */
        deleteQuestion : function (){
            
        },
        /**
         *  
         */
        addResponseFromInput : function (){
            if (event.keyCode ===  13){
                this.addResponseItem ();
            }
        },
        /**
         *
         */
        addResponseItem : function(event) {
            var value = this.$newSourceValue.val();
            if (value.length){
                try {
                    this.responseListView.addResponse(value);
                    value = "";
                }
                catch (error){
                    
                }
                this.$newSourceValue.val(value);
            }
            
        },
        /**
         *
         */
        close : function() {
            this.undelegateEvents();
            this.remove();
        }
    });
}); 