define(['jquery', 'underscore', 'backbone', 'calendar/fullcalendar', 'text!scripts/main/templates/collaboration/task/journal.html', 'scripts/main/views/collaboration/task/modal', 'scripts/main/models/collaboration/task'], function($, _, Backbone, calendar, template, TaskModal, TaskModel) {
    return Backbone.View.extend({
        /**
         *
         */
        template : _.template(template),
        /**
         * jquery calendar element
         */
        $calendar : null,
        /**
         * common modal
         */
        $modal : null,
        /**
         *
         * @param {Object}
         */
        initialize : function(options) {
            this.$el.html(this.template());
            _.bindAll(this, "addOne", "change");
            this.collection.bind('reset', this.addAll);
            this.collection.bind('add', this.addOne);
            this.collection.bind('change', this.change);
            this.$modal = this.$el.find('#event_modal');
        },
        /**
         *
         */
        change : function(event) {
            var fcEvent = this.$calendar.fullCalendar('clientEvents', event.get('id'))[0];
            fcEvent.title = event.get('title');
            fcEvent.color = event.get('color');
            this.$calendar.fullCalendar('updateEvent', fcEvent);
        },
        /**
         *
         */
        addAll : function() {
            this.$calendar.fullCalendar('addEventSource', this.collection.toJSON());
        },
        /**
         *
         */
        addOne : function(event) {
            var data = event.toJSON();
            data['backgroundColor'] = data['color'];
            this.$calendar.fullCalendar('renderEvent', data, true);
        },
        /**
         *
         */
        render : function() {
            var scope = this;
            /* initialize the external events
             -----------------------------------------------------------------*/

            /*$('#external-events div.external-event', this.$el[0]).each(function() {
             $('div.external-event', this.$el[0]).each(function() {
             // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
             // it doesn't need to have a start or end
             var eventObject = {
             title : $.trim($(this).text()) // use the element's text as the event title
             };

             // store the Event Object in the DOM element so we can get to it later
             $(this).data('eventObject', eventObject);

             // make the event draggable using jQuery UI
             $(this).draggable({
             zIndex : 999,
             revert : true, // will cause the event to go back to its
             revertDuration : 0 //  original position after the drag
             });

             });*/

            /*url : 'js/collaboration/scheduler',*/
            var options = {
                header : {
                    left : 'prev,next today',
                    center : 'title',
                    right : 'month,agendaWeek,agendaDay'
                },
                /* drag and drop */
                editable : true,
                /*droppable : true, // this allows things to be dropped onto the calendar !!!
                 drop : function(date) {// this function is called when something is dropped

                 // retrieve the dropped element's stored Event Object
                 var originalEventObject = $(this).data('eventObject');

                 // we need to copy it, so that multiple events don't have a reference to the same object
                 var copiedEventObject = $.extend({}, originalEventObject);

                 // assign it the date that was reported
                 copiedEventObject.start = date;

                 // render the event on the calendar
                 // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                 $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                 // is the "remove after drop" checkbox checked?
                 if ($('#drop-remove').is(':checked')) {
                 // if so, remove the element from the "Draggable Events" list
                 $(this).remove();
                 }

                 },*/
                classes : {
                    months : {
                        general : 'label'
                    }
                },
                selectable : true,
                selectHelper : true,
                select : $.proxy(this.select, this),
                eventClick : $.proxy(this.eventClick, this),
                eventDrop : function(fcEvent, dayDelta, revertFunc) {
                    var model = scope.collection.get(fcEvent.id);
                    var start = fcEvent.start;
                    var end = fcEvent.end;
                    model._silentSet({
                        'start' : start.toISOString(),
                        'end' : end.toISOString()
                    });
                    model.save({}, {
                        data : model.toJSON(),
                        success : scope.successDrop,
                        error : revertFunc,
                        wait : true
                    });
                },
                /**
                 * 
                 */
                eventRender : function(event, element) {
                    //$tag = $('<div class="task-label"><div class="task-label-color"></div></div>');
                    $(element).find('.fc-event-inner')./*find('.task-label-color')*/css({
                        'backgroundColor' : '#' + String(event.color)
                    });
                    //var $element = $(element).prepend($tag);
                }
            };
            require(['calendar/lang/' + __CONFIG__.locale], function(lang) {
                scope.$calendar = scope.$el.find('#calendar').fullCalendar(options);
                scope.$calendar.fullCalendar('addEventSource', scope.collection.toJSON());
            });
        },
        /**
         *
         * @param {Object} startDate
         * @param {Object} endDate
         */
        select : function(startDate, endDate) {
            var eventView = new TaskModal({
                model : new TaskModel({
                    start : startDate.toISOString(),
                    end : endDate.toISOString()
                }),
                $modal : this.$modal
            });
            eventView.collection = this.collection;
            eventView.render();
        },
        /**
         *
         * @param {Object} fcEvent
         */
        eventClick : function(fcEvent) {
            Backbone.history.navigate('collaboration/task/' + fcEvent.id, true);
        },
        /**
         *
         */
        successDrop : function(response) {

        },
        /**
         *
         */
        close : function() {
            this.remove();
        }
    });
});
