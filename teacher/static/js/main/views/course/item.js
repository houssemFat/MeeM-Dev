define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/course/item.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.View.extend({
        // Events
        events: {
            "click #view" : "view",
            "click #stats" : "stats",
            "click #classroom" : "classroom",
        },
        /**
         * 
         */
        className : 'col-sm-4 col-md-4',
        /**
         * 
         */
        initialize: function() {
             this.template = _.template(template || "");
        },
        /**
         * 
         */
        render: function() {
           var model = this.model,
                scope = this,
                bg = common.getRandomColor();
           scope.$el.html(this.template(_.extend(model.toJSONDisplay(), {bg : common.truncateString(bg, 6, '', 1)})));
           model.view = scope;
           return scope;
        },
        /**
         * 
         */
        view : function(e) {
            e.preventDefault ();
            Backbone.history.navigate('course/' + this.model.get('id'), true);
        },
        /**
         * 
         */
        
        stats : function(e) {
            e.preventDefault ();
            Backbone.history.navigate('course/' + this.model.get('id') + '/stats', true);
        },    
        /**
         * 
         */
        
        classroom : function(e) {
            e.preventDefault ();
            Backbone.history.navigate('course/' + this.model.get('id') + '/classroom', true);
        },     
        /**
         * 
         */
        close : function() {
            if (this.modalView)
                this.modalView.close ();
            this.remove ();
        },
  });
});
