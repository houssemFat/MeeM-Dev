define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/collaboration/team_item.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.Marionette.ItemView.extend({
        /**
         * toggle in/out
         */
        events: {
            "click #add" : "add",
            "click #view" : "view",
        },
        /**
         * 
         */
        className : '',
        /**
         * 
         */
        initialize: function() {
             this.template = _.template(template || "");
            _.bindAll(this, "change");
             this.model.on('change:selected', this.change);
        },
        /**
         * 
         */
        render: function() {
           this.$el.html(this.template(this.model.toJSON()));
           this.$button = this.$el.find('#add');
           return this;
        },
        modelEvents: {
            'change': "change"
        },
        /**
         * 
         */
        add : function (event){
            event.preventDefault();
            this.setButtonIcon ('spinner');
            this.listView.trigger('view:selected', this);
        },
        /**
         * 
         */
        view : function (event){
            event.preventDefault ();
            Backbone.history.navigate('collaboration/teams/' + this.model.get('id'), true);
        },
        
        /**
         * 
         */
        change : function (selected){
            var selected = this.model.get('selected') ;
            var btnStyle = 'btn-' + ( selected ? 'danger' : 'success' );
            var oldStyle = 'btn-' + ( !selected ? 'danger' : 'success' );
            var faStyle =  ( selected ? 'minus' : 'plus' );
            this.$button.addClass(btnStyle).removeClass(oldStyle);
            this.setButtonIcon (faStyle);
            
        },
        /**
         * 
         */
        setButtonIcon : function (style){
            this.$button.empty().html ('<i class="fa fa-'  + style  + '"></i>');
        },
        /**
         * 
         */
        close : function() {
            this.remove ();
        },
  });
});
