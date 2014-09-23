define(['jquery', 'underscore', 'backbone', 'moment', 'scripts/main/views/collaboration/label/list', 'scripts/main/collections/collaboration/label', 'commonWidget', 'text!scripts/main/templates/collaboration/task/view.html'], 
function($, _, Backbone, moment, LabelListView, LabelCollection, commonWidget, template) {
    return Backbone.View.extend({
        template : _.template(template),
        /**
         * 
         */
        $modal : null,
        /**
         * 
         */
        inactive : function(e) {
            e.preventDefault();
        },
        events : {
            'click #confirm' : 'save',/*
            'click .app-scheduler-event-color' : 'changeColor'*/
            'change #event_title' : 'changeTitle',
            'change #team' : 'changeTeam'
        },
        /**
         * 
         */
        initialize : function(options) {
            
            _.bindAll(this, "changeColor");
        },
        /**
         * 
         * @param {Object} event
         */
        changeColor : function(labelView) {
            this.model.set({'label' : labelView.model}, {silent : true});
            // the tag used is <i>
            this.$el.find("#my_label").css({
                'color' : this.model.get('label').get('color')
            });
        },
        /**
         * 
         */
        render : function() {
            this.$el.html (this.template(this.model.toJSON()));
            //this.$modal = options.$modal ;
            if (this.model.isNew()) {
                var $tabs = this.$el.find('#team_tab, #users_tab').removeAttr('data-toggle');
                $tabs.bind('click', this.inactive);
            }
            // With common.Slider
            common.Slider(this.$el.find('#slider_event_progress'), { dir : 'r'});
            // 
            this.labelsView = new LabelListView (
                { 
                    collection : new LabelCollection (this.model.get('labels')),
                    $el : this.$el.find('#labels') 
                   
                   });
             this.labelsView.renderCollection();
             this.labelsView.collection.on('label:selected', this.changeColor);
             
            this.model.unset('labels');
        },
        /**
         * 
         * @param {Object} event
         */
        changeTitle : function(event) {
            var title = $(event.currentTarget).val();
            this.model._silentSet({
                'title' : title
            });
        },
        /**
         * 
         * @param {Object} event
         */
        changeTeam : function(event) {
            var title = $(event.currentTarget).val();
            this.model._silentSet({
                'title' : title
            });
        },
        /**
         * 
         */
        save : function() {
            this.model.save({}, {
                data : this.model.toJSON(),
                success : $.proxy(this.successSave, this),
                wait : true
            });
        },
        /**
         * 
         * @param {Object} response
         */
        successSave : function(response) {
            
        },
        /**
         * 
         */
        close : function() {
            this.remove ();
        },
    });
}); 