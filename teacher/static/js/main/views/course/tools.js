define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/main/templates/course/view.html',
  'app',
  'scripts/main/views/chapter/list',
  'scripts/main/collections/chapter',
  'scripts/main/views/syllabus/list',
  'scripts/main/collections/syllabus',
  ], function($, _, Backbone, 
        template, App, 
        ChapterList, ChapterCollection, 
        SyllabusList, SullabysCollection) {
  return Backbone.View.extend({    
    /**
     * 
     */
    initialize: function(options) {
         this.template = _.template(template || "");
         //_.bindAll(this, 'render','confirmDelete', 'close');
         this.model.on('error', this.error);
    },
    /**
     * 
     */
    events: {
        "click #add_chapter": "createChapter",
        "click #create_task" : "createTask",
        "click #create_topic" :  "createTopic",
    },
    /**
     * 
     */
    render: function(options) {
        var model = this.model,
            me = this ;
       me.$el.html(this.template(model.toJSON()));
       model.view = this;         
    },
    /**
     * 
     */
    renderChildern : function (){
        var children = this.model.get ('chapters');
        this.chapterList = new ChapterList ({collection : new ChapterCollection (children)});
        
        var sylabus = this.model.get ('sylabus')  || [];
        this.syllabusList = new SyllabusList ({collection : new SullabysCollection (sylabus)});
        return this;
    },
    /**
     * 
     */
    createChapter: function() {
        var id = this.model.id;
        require(['scripts/main/views/chapter/form', 'scripts/main/models/chapter'], function(Form, Model) {
            App.mainRegion.show(new Form({
                model : new Model, id : id
            }));
          });
    },
    /**
      *
      */
    createTask : function (e){
        var $button = $(e.currentTarget),
            scope = this;
        $button.attr ({'disabled' : true}).find ('#text').html ('loading ...');
        require (['scripts/main/views/task/form', 'scripts/main/models/task'], function (TaskForm, TaskModel){
            new TaskForm ({model : new TaskModel ({courseId : scope.model.get ('id')}), button : $button});
            //$(e.currentTarget).attr ({'disabled' : true}).html ('loading ...');
        });
    },
    
    /**
      *
      */
    createTopic : function (e){
        this.syllabusList.create ();
    },
  });
});
