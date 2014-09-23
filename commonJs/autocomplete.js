/**
 * arabic.borad.js v0.0.1 by fathallah houssem
 * Copyright 2014 MeeM.
 * MIT , unlimited under respect !!!
 */
if (!jQuery) { throw new Error("autocompleter requires jQuery") ;};
if (!common) { throw new Error("autocompleter requires main common ") ;};
'use strict';
/**
 * buil an new aucomplete objcet
 * @param {Object} object
 * @param {Object} data
 * @param {Object} options
 */
common.autoCompleter = function (object, options){
    var options = options || {};
    return {
        parent : $(object).parent().addClass('app-relative')[0],
        inputSource_ : object,
        autocontainer_ : null,
        fakeInput_ : null, 
        index_ : 0,
        total_ : 0,
        options : options || {},
        url_ : options.url || '',
        animate_ : options.animate,
        dataType_ : options.dataType || 'text',
        width_ : options.width || null,
        append_ : options.append,
        parent_ : options.scope || null,
        onclick_ :  options.click || null,
        onrender_ :  options.onRender || null,
        onrun_ :  options.run || null,
        data_ : options.data || {},
        getItem_ : options.getItem || null,
        objects_ : null,
        /**
         *  
         */
        init : function (){
            var context = this ;
            this.autocontainer_ = 
                $('<ul class="app-autocomplete" id="auto_complete_' + object.id + '"/>').appendTo(this.parent).hide()[0];
            
            this.fakeInput_ = 
                $('<input id="fake_input" type="text" style="display:none;width:0px;height:0px"/>').appendTo($('body'))[0];
            
            if (typeof(this.append_) === 'undefined')
                this.append_ = true;
            /**
             * 
             */
            $(object).blur (function (){setTimeout (function (){$(context.autocontainer_).hide();}, 500);})
                .keyup ( function (event) {
                        context.fire.call(context, this, event || window.event);
                        return false;
                    });
                
            $(this.fakeInput_).keyup ( function (event) {
                                context.fire.call(context, obj, event || window.event);
                            return false;
                        });
            
            $(window).bind ('resize  scroll', $.proxy(context.updatePosition, context));
            return this ;
        },
        /**
         * 
         */
        updatePosition : function (){  
            var source = this.inputSource_,
                offset = $(source).offset(),
                offsetParent = $(source).parent().offset(),
                offsetTop =  offset.top - offsetParent.top,
                scroll = $('body').scrollTop(),
                /* check for paddding */
                height = $(source).innerHeight (),
                width = this.width_ || $(source).outerWidth(),
                $container = $(this.autocontainer_),
                rtl = source.style.direction ,
                left = offset.left  - offsetParent.left ;
            $container.css({'top' : /* offsetTop +*/ height,'width' : width});
            if (rtl.indexOf('rtl') > -1)
                left =  left +  width - $container.width () ;
            $container.css({'left' : left  , 'right' : '' });
        },
        /**
         * 
         */
        fire :  function (object, event) {
            var context = this ;
            var e = event || window.event || this.event ;
            switch (e.keyCode ){
                // enter key 
                case 13 :
                    if ((this.total_ > -1 ) && (this.index_ > -1)){
                        if (this.parent_ && this.onclick_ && this.objects_){
                            var target = this.objects_[this.index_].model  || this.objects_[this.index_];
                            context.fireEvent (target);
                        }
                    }                           
                    this.index_ = -1 ;
                    return false ;
                case 40 :
                    this.runThrough ("down");
                break ;
                case 38 :
                    this.runThrough ("up");
                break ;
                // char code
                default :
                    if (this.autocontainer_ !== null){
                        if (object.value.length > 0 ){
                            if (object.lastValue_ !== object.value){
                               // #FIXME
                               this.sendRequest.call(this, object.value); 
                            }
                               
                        }
                        else 
                            $(this.autocontainer_).hide();
                        object.lastValue_ = object.value ;
                    }
                this.running = false ;          
                break ;
            }
        },
        /**
         * 
         */
        sendRequest : function (key){
            if (this.send_)
                return ;
                var context = this ;
                if (key == '' || this.send_)
                    return ;
                $.ajax({
                    type        : 'GET',
                    url         : this.url_ +  '?q=' + key,
                    dataType    : this.dataType_,
                    success     : function (response){
                                    context.getResponse.call (context, response);
                                    },
                    data        : (typeof(this.data_) === 'function') ? this.data_ () : this.data_ 
                });
                this.send_ = true ;
        },
        /**
         * Handle the response from the user 
         * @param {Object} response
         */
        getResponse : function (response){
            var context = this,
                container = this.autocontainer_;
            $(container).empty();
            // #FIXME // table of object
            switch (this.dataType_){
                case 'json' :
                    var array = response.result || response || [],
                        length = array.length ,
                        item = '',
                        value = '',
                        $item ;
                    for (var i = 0 ; i <  length; i++){
                        item = this.getItem_ ? this.getItem_ (array[i]) : array[i] ;
                        value = item.value;
                        $item = $('<li></li>').html (item.template)
                        .attr ({ 'auto-value' : value})
                        .addClass('app-autocomplete-item')
                        .appendTo(container);
                        $item [0].model = array[i];
                    }
                    break;
                default :
                    $(container).append(response);
                    break;
                
            }
            var $objects = $('.app-autocomplete-item', container).hide(),
                length = $objects.length ;
            if (length > 0){
                $objects.click (function (){ 
                        if (context.parent_ && context.onclick_)
                            context.fireEvent (this.model || this);
                    });
                this.updatePosition (); 
                if (this.animate_){
                    var index = 0,
                        interval = function (){
                            $($objects[index]).show ({'animate' : 'slow', 'direction' : 'vertical'});
                            index = index + 1 ;
                            if (index < length)
                                setTimeout(interval, 50);
                        };
                    interval ();
                }
                else 
                    $objects.show ();
                $(container).show();
                this.objects_ = $objects ;
                this.total_ = $objects.length - 1 ;
                this.index_ = -1 ;
                
                // call the parent with objects to do what he wont
                if (this.onrender_){
                    this.onrender_.call (this.parent_, $objects); 
                }
                
            }
            else {
                $(container).hide();
            }
            this.send_ = false ;
        },
        /**
         * 
         * @param {Object} way
         */
        runThrough : function (way){
            if ( this.total_ !== null ){
                if (way == "down"){
                       this.index_ = this.index_ + 1 ;
                       var index = this.index_ ;
                        // end liste 
                       if ( index > this.total_ ){
                            // intial value 
                            this.idleItem (index-1);
                            this.index_ = -1 ;
                       }
                       else if (index === - 1 ){    
                            this.idleItem (this.total_);
                        }
                        else{
                            this.idleItem (index - 1);
                            this.activeItem (index);
                       }
                   }
                else {
                    this.index_ = this.index_ - 1; 
                    var index = this.index_ ;
                    switch (index){
                        case -2 :
                            this.index_ = this.total_ ;
                            this.activeItem (this.index_);
                            break;
                        case -1:
                            this.idleItem (0);
                            break;
                        default :
                            this.idleItem (index + 1);
                            this.activeItem (this.index_);
                        }
                    }
                if (this.index_ <= - 1){
                    var object = this.inputSource_; 
                    object.value = object.lastValue_ ;
                    this.inputSource_.select ();
                }   
                else 
                    this.fakeInput_.select ();
            }
        },
        /**
         * 
         */
        activeItem : function (index){
            var object = this.objects_ [index],
                value = $(object).attr('auto-value'),
                source = this.inputSource_ ;
            if (this.append_)
                source.value = value;
            else   
                this.onrun_.call (this.parent_ || object, source.lastValue_, value);
          
            $(object).addClass('app-autocomplete-item-active');
       },
        /**
         * 
         */
        idleItem : function (index) {
            $(this.objects_ [index]).removeClass('app-autocomplete-item-active');
        },
        /**
         * 
        * @param {Object} object
         */
        fireEvent : function (object){
            this.onclick_.call (this.parent_ || object, object, $(object).attr('auto-value'));
            $(this.autocontainer_).hide ();
        }
    };
};

common.autoComplete = function (object, options){
    if (typeof(object) === 'string')
        object = $('#' + object + ':eq(0)')[0];
    return (new common.autoCompleter (object, options)).init ();
};