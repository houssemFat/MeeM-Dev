define([
  'jquery',
  'underscore',
  'backbone',
  'text!scripts/main/templates/classroom/view.html',
  'app',
  'datejs',
  'D3',
  ], function($, _, Backbone, 
        template, App, datejs,  d3) {
  return Backbone.View.extend({    
    /**
     * 
     */
    initialize: function(options) {
         this.template = _.template(template || "");
         //_.bindAll(this, 'render','confirmDelete', 'close');
         this.model.on('error', this.error);
    },
    bodyView : null,
    currentTab : null,
    /**
     * 
     */
    events: {
        "click #view_statics": "viewStatisticsChapter",
        "click #view_work" : "viewWork",
        "click #send_message" : "sendMessageChapter",  
    },
    /**
     * 
     */
    render: function(options) {
        var model = this.model,
            scope = this ;
       scope.$el.html(this.template(model.toJSON()));
       
       model.view = this;
       this.bodyView =   scope.$el.find('#body');
       this.currentTab = scope.$el.find('.hoz-tabs').find('.active');
       this.currentTab.find('a').click();
    },
    /**
     * 
     */
    sendMessageChapter: function(e) {
       e.preventDefault ();
       this.switchTab (e);
        
    },
    /**
      *
      */
    viewWork : function (e){
       e.preventDefault ();
       this.switchTab (e);
       
    },
    /**
      *
      */
    viewStatisticsChapter : function (e){
       e.preventDefault ();
       this.switchTab (e);
        $.ajax ({
                url : this.model.url () + '/stats' ,
                type : 'get' ,
                success : $.proxy (this.updateGraph, this) 
                }
           );
    },
     /**
      * 
      * @param {Object} event
      */
    updateGraph : function (data){
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        
        //var parseDate = d3.time.format("%d-%b-%y").parse;
        var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S"),
            ymindate = new Date(2013,02,20, 0),  // TODO: clip date 
            ymaxdate = new Date(2013,02,20, 23),
            xmindate = new Date(2014,09,15),  // TODO: clip date 
            xmaxdate = new Date(2015,09,15);
        
        _.each (data, function (d,i) {
                    var _x = new Date ();
                        _x.setTime(parseInt(d.date)),
                        //date = _x.toJSONString();
                        d.axis = parseDate.parse (_x.toString("yyyy-MM-dd hh:mm:ss"));
                });
        

        var svg = d3
                    .select(this.$el.find ('#body_work')[0])
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        
            var margin = {top: 40, right: 40, bottom: 40, left: 40},
            width = 400,
            height = 300;

            var x = d3.time.scale()
                .domain(d3.extent(data, function(d) { return d.axis; }))
               .range([0, width - margin.right - margin.left]);

            var y = d3.scale.linear()
                .domain(d3.extent(data, function(d) { return d.result; }))
                .range([height - margin.top - margin.bottom, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");
            
            svg.selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("cx", function(d) { 
                    return x(d.axis); 
                })
                .attr("fill",   function (){
                    return common.getRandomColor ();
                    }
                )
                .attr("cy", function(d) { 
                    return y(d.result); 
                    })
                .attr("r", 6);

            svg.append("g") // Render the axis by calling a <g> selection.
                .attr("transform", "translate(0," + y.range()[0] + ")") //setzt x-achse an null punkt von y-achse
                .call(xAxis);

            svg.append("g")
                .call(yAxis);
        }, /**
      * 
      * @param {Object} event
      */
     switchTab : function (event){
            var $source = $(event.currentTarget),
                toActive = $source.attr('for');
                $tab = $source.closest ('li');
            this.currentTab.removeClass('active');
            this.currentTab = $tab ;
            $tab.addClass('active');
            $('.tabs-body', this.$el).hide ();
            $('#' + toActive, this.$el).show ();
     }
  });
});
