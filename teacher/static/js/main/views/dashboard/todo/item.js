define([
  'jquery', 
  'underscore', 
  'backbone',
  'app',
  'text!scripts/main/templates/dashboard/todo/item.html',
  ], function($, _, Backbone, App, template)  {

  return Backbone.View.extend({
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #view" : "view",
        },
        /**
         * 
         */
        tagName : 'li',
        /**
         * 
         */
        className : 'list-group-item',
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
           var data = this.model.toJSON();
           var format = "DD,  HH:mm:ss";
           var due = moment(this.model.get('end')).diff(moment());
           if (due < 0){
               data['due'] = 'Ended since ' + moment.utc(due).format(format);
           }
           else {
              data['due'] = 'Left ' + moment.utc(due).format(format);
           }
           this.$el.html(this.template(data));
            this.$el.find('.show-menu').on('click', function(event) {
                event.preventDefault();
                $(this).closest('ul').closest('li').toggleClass('open');
            });
           this.model.view = this;
           return this;
        },
        /**
         * 
         */
        view : function (event){
            event.preventDefault();
            Backbone.history.navigate(this.model.get('model') + '/' + this.model.get('id'), true);
            
        },
        /**
         * 
         */
        close : function() {
            this.remove ();
        },
  });
});
