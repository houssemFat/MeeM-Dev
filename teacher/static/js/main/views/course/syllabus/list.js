define([
  'jquery', 
  'underscore', 
  'backbone',
  'list',
  'app',
  'text!scripts/main/templates/course/syllabus/list.html',
  'scripts/main/views/course/syllabus/item',
  ], function($, _, Backbone , ListView,
        App, 
        template,
        itemView) {
  var SyllabusListView =  ListView.extend({
        /**
         *
         */
        events : {
            'click .add-new' : 'addNew',
        },
        /**
        * 
        */
        courseId : null,
        /**
        * 
        * @param {Object} options
        */
        initialize: function(options){
            this.courseId = options.courseId;
            this.template = _.template(template);
        },
        /**
        * 
        */
        itemView : itemView,
        /**
         * 
         * @param {Event} e
         */
        addNew : function(e){
            e.preventDefault ();
            Backbone.history.navigate('chapter/' + this.chapterId + '/syllabus/create', true);
        }
    });
  return SyllabusListView;
});

