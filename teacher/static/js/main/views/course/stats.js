define(['jquery', 'underscore', 'backbone', 'app', 'text!scripts/main/templates/course/stats.html', 'D3', 'common'], function($, _, Backbone, App, template, d3, common) {

    return Backbone.Marionette.View.extend({
        events : {
            'click #weekly' : 'weekly',
            'click #daily' : 'daily',
            'click #monthly' : 'monthly',
        },
        Graph : null,
        tagName : 'div',
        $modal : null,
        initialize : function() {
            this.template = _.template(template || "");
            this.render();
        },
        /**
         *
         */
        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
        },
        onShow : function() {

            var dataset = {
                apples : [53245, 28479, 19697, 24037, 40245],
            };

            var width = 460, height = 300, radius = Math.min(width, height) / 2;

            var color = d3.scale.category20();

            var pie = d3.layout.pie().sort(null);

            var arc = d3.svg.arc().innerRadius(radius - 100).outerRadius(radius - 50);

            var svg = d3.select(this.$el[0]).append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var path = svg.selectAll("path").data(pie(dataset.apples)).enter().append("path").attr("fill", function(d, i) {
                return color(i);
            }).attr("d", arc);
        },
        getStatistcs : function($button, type) {
            event.preventDefault();
            $button.button('disable').html('<i class="fa fa-spinner"> ...');
            $.ajax({
                url : this.model.url('/stats'),
                data : {
                    type : type
                },
                type : 'get',
                success : $.proxy(this.updateGraph, this, $button, type)
            });
        },
        updateGraph : function($button, type, response) {
            $button.button('enable').html(type);
            if (!this.SVGGraph) {
                var width = 450, height = 200;
                this.SVGGraph = d3.select($("#course_statistics_graph", this.$el)[0]).append("svg").attr("width", width).attr("height", height);
            }
            this.updateResultsGraph(response);
        },

        updateResultsGraph : function(response) {
            var dataset = response;
            this.SVGGraph.selectAll("rect").data(dataset).enter().append("rect").attr("x", function(data, index) {
                var x = new Date();
                x.setTime(parseInt(data.create_time));
                return (index * 30);
            }).attr("y", 0).attr("width", 29).attr("height", function(data, index) {

                return ((index + 1 ) * 10);
            }).attr("fill", function(data, index) {
                return common.getRandomColor();
            }).on("mouseover", function(object) {
                $(this).transition().duration(200).style("opacity", .9);
                /*
                 div.html(formatTime(d.date) + "<br/>"  + d.close)
                 .style("left", (d3.event.pageX) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");    */
            }).on("mouseout", function(object) {
                $(this).transition().duration(500).style("opacity", 0);
            });
        },
        monthly : function(event) {
            var $button = $(event.currentTarget);
            this.getStatistcs($button, 'monthly');
        },
        daily : function(event) {
            var $button = $(event.currentTarget);
            this.getStatistcs($button, 'daily');
        },
        weekly : function(event) {
            var $button = $(event.currentTarget);
            this.getStatistcs($button, 'weekly');
        },
        /**
         *
         */
        close : function() {
            this.remove();
        }
    });
});
