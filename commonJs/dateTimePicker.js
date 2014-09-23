'use strict' ;
if (!jQuery) { throw new Error("calendar  requires jQuery") ;};
if (!_) { throw new Error("calendar requires undescrore") ;};
if (!moment) { throw new Error("calendar requires undescrore") ;};

var template = '<div class="date-picker date"  data-date="<%= date %>" data-keyboard="true">' + 
                '<div class="date-container pull-left">' + 
                    '<h4 class="weekday">Monday</h4>' + 
                    '<h2 class="date">Februray 4th</h2>' + 
                    '<h4 class="year pull-right">2014</h4>' + 
                '</div>' + 
                '<span data-toggle="datepicker" data-type="subtract" class="fa fa-angle-left"></span>' + 
                '<span data-toggle="datepicker" data-type="add" class="fa fa-angle-right"></span>' + 
                '<div class="input-group input-source">' + 
                    '<input type="text" class="form-control" data-format="YYYY/MM/DD" placeholder="YYYY/MM/DD">' + 
                    '<span class="input-group-btn">' + 
                        '<button class="btn btn-default" type="button">Go!</button>' + 
                    '</span>' + 
                '</div>' + 
                '<span data-toggle="edit" class="fa fa-pencil"></span>' + 
                '<span data-toggle="time" class="fa fa-clock-o"></span>' +
            '</div>' ;
  
var timeTemplate = '<div class="date-picker time"  data-time="<%= time %>" data-keyboard="true">' + 
            '<div class="time-container">' + 
            '<ul class="col-lg-6 list-unstyled">' + 
            '<li ><span data-toggle="timepicker-minute" data-type="add" class="fa fa-angle-up arrow"></span></li>' +
            '<li class="date-container">' + 
                '<h4 class="minutes">None</h4>' + 
            '</li>' +  
            '<li ><span data-toggle="timepicker-minute" data-type="subtract" class="fa fa-angle-down  arrow"></span></li>' +
            '</li>' + 
            '</ul>' + 
            '<ul class="col-lg-6 list-unstyled">' + 
            '<li ><span data-toggle="timepicker-hour" data-type="add" class="fa fa-angle-up  arrow"></span></li>' + 
            '<li class="date-container">' + 
                '<h4 class="hours">None</h4>' + 
            '</li>' + 
            '<li ><span data-toggle="timepicker-hour" data-type="subtract" class="fa fa-angle-down  arrow"></span></li>' + 
            '</ul>' +
            '</div>' +  
            '<div class="input-group input-source">' + 
                '<input type="text" class="form-control" data-format="HH:mm" placeholder="HH:mm">' + 
                '<span class="input-group-btn">' + 
                    '<button class="btn btn-default" type="button">Go!</button>' + 
                '</span>' + 
            '</div>' + 
            '<span data-toggle="edit" class="fa fa-pencil"></span>' + 
            '<span data-toggle="calendar" class="fa fa-calendar"></span>'+
        '</div>';
/**
 * Slider
 */
common.DateTimePicker = function(object, options) {
    this.object = object ;
    this.getDate = function (){
        return this.date;
    };
    var date = moment ($(object).data('date'));
    if (!date.isValid()){
        date = moment ();
    }
    var format = moment ($(object).data('format'));
    this.date = date || moment (options ? ( options.date || ''  ) : '' ).format ('YYYY/MM/DD') ;
    this.events = {
        
    };
    if (options && options.change){
        this.events.change = options.change ;
    }
    this._bind();
    
};
      /**
       * 
       */
common.DateTimePicker.prototype = {
      _bind : function (){
          var scope = this ;
          var $object = $(this.object);
          var $final_value = $object.find('.datatime-value').hide ();
          var final_format = $object.data('format');
            var $old = $('<div style="display:none"></div>').appendTo($object).hide();
            var $days = $('<select id="days"></select>').appendTo($old);
            for (var i = 1 ; i< 32 ; i++ ){
                $days.append($('<option value='+ i +'>' + i + '</option>'));
            }
            var $months = $('<select id="month"></select>').appendTo($old);
        
           /**
             * 
             */
            var months =  ["January", 
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"];
            for (i = 0 ; i < months.length ; i++ ){
                $months.append($('<option id='+ i +'>' + months[i] + '</option>'));
            }
            var $years = $('<select id="years"></select>').appendTo($old);
            /**
             * 
             */
            for (i= 2014 ; i < 2017 ; i++){
                $years.append ($('<option value='+ i +'>' + i + '</option>'));
            }
            var thirteen = [1,3,5,7,8,10,,12];
            var _change = function (){
                var isLeap = scope.isLeap (this[this.selectedIndex].value);
                var month = $months[0];
                var indexOfMonth = month.selectedIndex + 1;
                
                var $thiryOneDays = $days.find(scope.getMonthSelector(31));
                var $thiryDays = $days.find(scope.getMonthSelector(30));
                var $twentyNineDay = $days.find(scope.getMonthSelector(29));
                if (thirteen.lastIndexOf(indexOfMonth) < 0){
                    $thiryOneDays.hide ();
                    if (indexOfMonth ===2){
                        $thiryDays.hide ();
                        if (!isLeap){
                            $days.find(scope.getMonthSelector(29)).hide ();
                        }
                        else {
                            $days.find(scope.getMonthSelector(29)).show ();
                        }
                    }
                    else {
                        $twentyNineDay.show();
                        $thiryDays.show ();
                    }
                }
                else {
                    $twentyNineDay.show();
                    $thiryDays.show ();
                    $thiryOneDays.show ();
                }
                
            };
        $years.on('change', _change);
        $months.on('change', _change);
        
        var $datepicker = $(_.template(template)({date : this.date})).appendTo($object);
        var format = {
                "weekday" : ($datepicker.find('.weekday').data('format') ? $datepicker.find('.weekday').data('format') : "dddd"),                
                "date" : ($datepicker.find('.date').data('format') ? $datepicker.find('.date').data('format') : "MMMM Do"),
                "year" : ($datepicker.find('.year').data('year') ? $datepicker.find('.weekday').data('format') : "YYYY")
            };
        var cur_time = this.date.format('HH:mm');
        var $timePicker = $(_.template(timeTemplate)({time : cur_time})).appendTo($object).hide ();
        var scope = this;
        function updateFinalResult (){
            $final_value.val (this.date.format(final_format));
            $final_value.trigger ('change');
            if (this.events.change){
                this.events.change(this.date);
            };
        }
        function updateDisplay() {    
            $datepicker.find('.date-container > .weekday').text(scope.date.format(format.weekday));
            $datepicker.find('.date-container > .date').text(scope.date.format(format.date));
            $datepicker.find('.date-container > .year').text(scope.date.format(format.year));
            $datepicker.data('date', scope.date.format('YYYY/MM/DD'));
            $datepicker.find('.input-source').removeClass('show-input');
            updateFinalResult.call (scope);
        }
        function updateTimeDisplay() {
            var time_format = scope.date.format('HH:mm');
            var time = time_format.split(':');
            $timePicker.find('.date-container > .hours').text(time[0]);
            $timePicker.find('.date-container > .minutes').text(time[1]);
            $timePicker.find('.input-source').removeClass('show-input');
            $timePicker.find('.input-source').find('input').val (time_format);
            updateFinalResult.call (scope);
        }
        updateDisplay.call(this, this.date);
        updateTimeDisplay.call(this);
        $datepicker.on('click', '[data-toggle="edit"]', function(event) {
            event.preventDefault();
            $datepicker.find('.input-source').toggleClass('show-input');
        });
         $timePicker.on('click', '[data-toggle="edit"]', function(event) {
            event.preventDefault();
            $timePicker.find('.input-source').toggleClass('show-input');
        });
         $datepicker.on('click', '[data-toggle="time"]', function(event) {
            event.preventDefault();
            $datepicker.hide ();
            $timePicker.show ();
        });
        $timePicker.on('click', '[data-toggle="calendar"]', function(event) {
            event.preventDefault();
            $timePicker.hide ();
            $datepicker.show ();
        });

        $datepicker.on('click', '.input-source > .input-group-btn > button', function(event) {
            event.preventDefault();
            var $input = $(this).closest('.input-source').find('input'),
                date_format = ($input.data('format') ? $input.data('format') : "YYYY/MM/DD");
            if (moment($input.val(), date_format).isValid()) {
               updateDisplay(moment($input.val(), date_format));
            }else{
                alert('Invalid Date');
            }
        });
        
        $datepicker.on('click', '[data-toggle="datepicker"]', function(event) {
            event.preventDefault();
            var date_type = ($datepicker.data('type') ? $datepicker.data('type') : "days"),
                type = ($(this).data('type') ? $(this).data('type') : "add"),
                amt = ($(this).data('amt') ? $(this).data('amt') : 1);
                
            if (type == "add") {
                scope.date = scope.date.add(date_type, amt);
            }else if (type == "subtract") {
                scope.date = scope.date.subtract(date_type, amt);
            }
            updateDisplay.call(this, scope.date);
        });
        
        $timePicker.on('click', '[data-toggle="timepicker-hour"]', function(event) {
            event.preventDefault();
            var type = ($(this).data('type') ? $(this).data('type') : "add");
                
            if (type == "add") {
                if (scope.date.hours ()<23){
                    scope.date.add (1, 'hours');
                }
                else {
                    return;
                }
            }else if (type == "subtract") {
                if (scope.date.hours ()>0){
                    scope.date.add (-1, 'hours');
                }
                else {
                    return;
                }
            }
            updateTimeDisplay.call(scope);
        });
        
        $timePicker.on('click', '.input-source > .input-group-btn > button', function(event) {
            event.preventDefault();
            var $input = $(this).closest('.input-source').find('input'),
                time_format = ($input.data('format') ? $input.data('format') : "HH:mm"),
                timeFormat = /^([0-9]{2})\:([0-9]{2})$/,
                value = $input.val();
            if  (timeFormat.test(value)) {
                var text = value.split(':');
                var minutes = parseInt(text[1]);
                var hours = parseInt(text[0]);
                if (!((minutes < 60) && (minutes > 0 )) || !((hours < 24 ) &&( hours > 0 ))){
                    alert('Invalid Time');
                    return ;
                }
                scope.date.set('minutes', minutes);
                scope.date.set('hours', hours);
                updateTimeDisplay.call(this, scope.date.format('HH:mm'));
            }
            else{
                alert('Invalid Time');
                return ;
            }
        });
        
        $timePicker.on('click', '[data-toggle="timepicker-minute"]', function(event) {
            event.preventDefault();
            var type = ($(this).data('type') ? $(this).data('type') : "add");
                
            if (type == "add") {
                if (scope.date.minutes ()<59){
                    scope.date.add (1, 'minutes');
                }
                else {
                    return;
                }
            }else if (type == "subtract") {
                if (scope.date.minutes ()>0){
                    scope.date.add (-1, 'minutes');
                }
                else {
                    return;
                }
            }
            updateTimeDisplay.call (this);
        });
       },
      getMonthSelector : function (){
          var args = arguments ;
          var selector = '';
          for (var i=0; i < args.length ; i++){
              selector += '[value="'+ args[i] +'"]';
              if (i < args.length - 1){
                  selector += ',';
              }
          }
          return selector;
      },
       
       /**
        * 
        */
       isLeap : function (year){
           return (((year % 4) == 0 ) || ( (year % 100) == 0 )) ;
       },
};
moment.locale(
    'fr', {
        months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "dans %s",
            past : "il y a %s",
            s : "quelques secondes",
            m : "une minute",
            mm : "%d minutes",
            h : "une heure",
            hh : "%d heures",
            d : "un jour",
            dd : "%d jours",
            M : "un mois",
            MM : "%d mois",
            y : "une année",
            yy : "%d années"
        },
        ordinal : function (number) {
            return number + (number === 1 ? 'er' : 'ème');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
moment.locale(
    'ar' ,  {
        weekdays: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
        weekdaysShort: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد"],
        weekdaysMin: ["ح", "ن", "ث", "ع", "خ", "ج", "س", "ح"],
        months: ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "اوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
        monthsShort: ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "اوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
        today: "هذا اليوم",
        rtl: true
    }
);
moment.locale('ar');