/**
 * book module  
 */
MT.L = {};
/**
 * 
 */
MT.L.Book = function (){
    var $data = $('#data_server:eq(0)');
    /**
     * 
     */
    this.baseUrl_ = $data.attr('base-url');
    /**
     * 
     */
    this.rateUrl_ = this.baseUrl_ + '/rate';
    /**
     * 
     */
    this.commentUrl_ = this.baseUrl_ + '/comment';
    /**
     * 
     */
    this.addToLibraryUrl_ = this.baseUrl_ + '/library';
    /**
     * 
     */
    
    this.lastFiredComment_ = this ;
    
    
    /**
     * 
     */
    this.$commentBody_ = null;
    /**
     * save the last id of created book 
     */
    this.lastCreatedBookId_ = null ;
    /**
     * save the last id of created book 
     */
    this.getLastCreatedId = function (){
        return this.lastCreatedBookId_ ;    
    };
    
};
MT.L.Book.prototype = {
    /**
     * 
     */
    init : function (){
        var context = this;
        // add a new book
        $('#app_add_new_book').click (function (){context.createBook(this);});
        // add a book
        $('#add_book').click(function() {
            context.switchCreationBookStep (1);
            Lib.Widget.displayModal('add_book_modal');
        });
        // browse the books
        $('.app-l-book-item').each(
           // rating
            function (){
                context.saveBook (this);
            }
        ); 
        // tags autocomplete;
        var $tagValues = $('#app_add_book_tags_input:eq(0)'),
            suggestUrl = $tagValues.attr('data-ac'),
            tagValues = $tagValues[0],
            suggestUrl = suggestUrl || tagValues.dataset.ac;
        if (tagValues)
            Lib.autoComplete (tagValues, {
                'url' : suggestUrl, 
                'animate' : false, 
                'dataType' : 'array', 
                'width' : 150 ,
                'click' : function (value){
                      $tagValues.value (original + value);
                },
                'run' : function (original , value){
                      $tagValues.value (original + ' #' +  value);
                },
                'append' : false
            });
        // comment modal
        
        // post a new comment
        $('#app_add_comment_book').click(function (){
            context.postComment (this);
        });
        // upload 
        var optionsUp = {
            url : this.baseUrl_,
            exts : ['png', 'jpg'],
            scope : this ,
            after : this.afterCoverBookFn,
            data : function (){return { 'id' : context.getLastCreatedId ()};}
        };
        new Lib.uploadHelper  ('app_book_poster', 'book_cover_source', 'book_cover_image', optionsUp);
        //
        context.$commentBody_ = $('#comment_book_body');
        
    },
    /**
     * 
     */
    saveBook : function (scope){
      var context = this ;
            // popover
            var $button = $('.app-l-book-rating-icon:eq(0)', scope).click (function(){
            var $targer = $($(this).attr('data-target'), scope) ;
            if (!this.__appIsShow){
                $targer.removeClass('hidden');
            }
            else {
                $targer.addClass('hidden');
            }
            this.__appIsShow = !this.__appIsShow;    
        });
        $('.app-l-book-rating-value', scope).bind ('mouseover',
          function (){
              context.showRate (scope , this);            
          }).click (function(){
              context.rate (scope , this, $button);
          });
        // comment url
        $('.app-book-comment:eq(0)', scope).click(
          function (){
              context.lastFiredComment_ = scope ;
              Lib.Widget.displayModal('comment_book_modal');            
          }
        );
        //
        $('.app-book-add-library:eq(0)', scope).click(
          function (){
              context.addToLibrary (scope , this);          
          }
        );
        }
    ,
    showRate : function (parent, source){
        var value = $(source).attr('value');
        this.setRate (parent, value);
    },
    /**
     * 
     */
    setRate : function (parent, value){
        $('.app-l-book-rating-value', parent).each (function(){
           var myValue = parseInt($(this).attr('value'));
           if (myValue <= value ){
             $(this).removeClass('app-l-book-rating-off').addClass('app-l-book-rating-on');
           }
           else{
             $(this).removeClass('app-l-book-rating-on').addClass('app-l-book-rating-off');    
           }
        });
    },
    /**
     * 
     */
    rate : function (parent, source, $button){
       var myValue = parseInt($(source).attr('value'));
       $button.find('i').removeClass('fa-star').addClass('fa-spinner');
       $.ajax({
          'type' : 'GET',
          'dataType' : 'json',
          'url' : this.rateUrl_,
          'data'       : {id : this.getObjectId(parent), value : myValue},
          'success' : $.proxy(this.successRate, this, parent, source, myValue, $button)
       });
    },
    /**
     * 
     */
    successRate : function (parent, source, value, $button, response){
       $('.app-l-book-rating:eq(0)', parent).addClass('hidden');
       $button.find('i').removeClass('fa-spinner').addClass('fa-star');
       $button[0].__appIsShow = false;
    },
    /**
     * 
     */
    postComment : function (source){ 
       var id =  this.getObjectId(this.lastFiredComment_),
           text = this.$commentBody_.val(),
           $parent  = this.$commentBody_.parent() ;
           if (Lib.isValueLessThen(text, 0)){
               $parent.addClass('has-error');
               return;
           };
       
       $(source).button ('loading').show();
       $(source).button ('disable');
       $parent.removeClass('has-error');
       $.ajax({
          'type' : 'POST',
          'dataType' : 'json',
          'url' : this.commentUrl_,
          'data'       : {id : id, content : text},
          'success' : $.proxy(this.successComment, this, source),
          'error' : $.proxy(this.errorComment, this, source),
       });
    },
    /**
     * 
     */
    successComment : function (source, response){
       this.$commentBody_.val('');
       $(source).button ('loading');
       $(source).button ('enable');
       $(this.lastFiredComment_).find('#in_library_count:eq(0)').html (response.count);
       Lib.Widget.hideModal();
    },
    /**
     * 
     */
    errorComment : function (source, response){
       this.$commentBody_.val('');
       $(source).button ('loading');
       $(source).button ('enable');
       Lib.Widget.hideModal();
    },
    /**
     * 
     */
    addToLibrary : function (book, source, $button){
       var isIn = $(source).attr('data-in');
       isIn = (isIn === 'true') ? false : true;
       $(source).removeClass('fa-coffee').addClass('fa-spinner');//.unbind('click');
       $.ajax({
          'type' : 'GET',
          'dataType' : 'json',
          'url' : this.addToLibraryUrl_,
          'data'       : {id : this.getObjectId(book), attach : isIn},
          'success' : $.proxy(this.successAddToLibrary, this, source, isIn)
       });
    },
    /**
     * 
     */
    successAddToLibrary : function (source, isIn, response){       
       $(source).bind('click').addClass('fa-coffee')
       .removeClass('fa-spinner').attr ({'data-in' : isIn})[(isIn ? 'add' : 'remove') + 'Class']('app-l-book-in-library');
       var count = response.count ;
       $(source).parent().find('#in_library_count').html (count);
    },
    /**
     * 
     */
    getObjectId : function (object){
        return  $(object).attr('data-id');
    },
    /**
     * create a new book  
     */
    createBook : function (button){
        var $form = $('#app_book_create_form'),
            canContinue = true ;
            $('input', $form[0]).each(function(index) {
                  if (Lib.isValueLessThen(this.value)){
                      canContinue = false ;
                      $(this).parent().addClass('has-error');
                  }
                  else{
                      $(this).parent().removeClass('has-error');
                  }           
                });
       if (!canContinue)
            return ; 
        var source = button ;
        $(source).button('loading').show();
        $.ajax({
           type: 'post',
           url : $(button).attr ('data-url'),
           data : $form.serialize(),
           dataType : 'json',
           success : $.proxy(this.successCreateBook, this, source, button),
           error : $.proxy(this.errorCreateBook, this, source, button)
        });
    },
    /**
     * 
     */
    successCreateBook : function (source , button, response){
        if (response.id){
            this.lastCreatedBookId_ = response.id;
            this.switchCreationBookStep (2, button);
        }
        else 
            alert ('an error was aquired !');
    },
    /**
     * 
     */
    errorCreateBook : function (source , button, response){
        if (response.id){
            this.lastCreatedBookId_ = response.id;
            this.switchCreationBookStep (2, button);
        }
        else 
            alert ('an error was aquired !');
    },
    /**
     *  
     */
    afterCoverBookFn : function (response){
        if(response.STATE = 'SUCCESS'){
            //this.switchCreationBookStep (1);
            $('#book_cover_image').attr({'src' : response.url});
        }
            
    },
    switchCreationBookStep : function (step, button){
        var str = 'Class',
            isOne = (step === 1 )  ;
        // case 2
        $('#app_book_poster:eq(0)')[( !isOne ? 'remove' : 'add' ) + str]('hidden');
        // case 1
        $('#app_book_create_form:eq(0)')[( isOne ? 'remove'  : 'add' ) + str]('hidden');
        // hide button 
        $(button).button('loading')[isOne ? 'show' : 'hide']();
    }
};
$(document).ready (function (){
    var appCourse = new MT.L.Book ();    
        appCourse.init ();
});