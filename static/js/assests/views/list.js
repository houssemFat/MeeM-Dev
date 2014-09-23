define(['jquery', 'underscore', 'backbone', 'app', 'assests/views/list/emptyView', 'text!assests/templates/list/footer.html'], function($, _, Backbone, App, EmptyView, footerTemplate) {
    var ListView = Backbone.Marionette.CompositeView.extend({
        /**
         * 
         */
        perPage : 4,
        /**
         *
         */
        currentIndex : 1,
        /**
         * 
         */
        serverOptions : {},
        /**
         *
         */
        $empty : null,
        /**
         *
         */
        $container : null,
        /**
         * 
         */
        
        EmptyView : EmptyView,
        /**
         *
         */
        constructor : function(options, serverOptions) {
            this.events = _.extend({}, this.events, this.pageEvents);
            Backbone.Marionette.CompositeView.apply(this, arguments);
            if (serverOptions){
              this.serverOptions = common.pop(serverOptions, 'list');  
            }
            this.on("composite:collection:rendered", this.collectionRendered);
            this.on("item:added", this.newChildAdded);
            this.on("composite:model:rendered", this._render);
        },
        /**
         * Internal function to manage search and pagination
         */
        _render : function() {
            this.$container = this.$el.find('#list_view');
            this.$empty = this.$el.find('#list_empty').hide();
            /* toggle search  */
            $('[data-command="toggle-search"]', this.$el[0]).on('click', function(event) {
                event.preventDefault();
                $(this).toggleClass('hide-search');
                if ($(this).hasClass('hide-search')) {
                    $('.c-search').closest('.row').slideUp(100);
                } else {
                    $('.c-search').closest('.row').slideDown(100);
                }
            });
            if (this.collection.length === 0){
                this.$empty.show ();
                this.$container.hide ();
            }
            else {
                this.$empty.hide ();
                
            }
            this.manageNavigation();
            this.trigger('dom:ready');
        },
        /**
         * 
         */
        newChildAdded : function (){
            this.$empty.hide ();
            this.$container.show ();
        },
        /**
         * 
         */
        renderModel : function (){
            this.$el.html(this.template(this.getModel({}).toJSON()));
            // tigger dom rendered
        },
        /**
         * 
         */
        getModel : function (options){
            if (!this.model)
                this.model = new Backbone.Model(_.extend (this.serverOptions, options, {total : this.serverOptions.total, index : this.currentIndex}));
            var total = this.model.get('total');
            var perPage = this.perPage ;
            var pagecount = parseInt(total/perPage) + (((total% perPage) > 0) ? 1 : 0);
            this.model.set ({'pagecount' : pagecount }, {silent : true});
            return this.model ;
            
        },
        /**
         *
         */
        pageEvents : {
            'click #next' : 'next',
            'click #previous' : 'previous',
            'click .page-nav' : 'navigate',
        },
        /**
         *
         */
        next : function(event) {
            event.preventDefault();
            this.loadPage(this.currentIndex + 1);
        },
        /**
         *
         */
        previous : function(event) {
            event.preventDefault();
            var index = this.currentIndex - 1;
            if (index < 1)
                index = 1;
            this.loadPage(index);
        },
        /**
         *
         * @param {Object} collectionView
         * @param {Object} itemView
         */
        appendHtml : function(collectionView, itemView, index) {
            this.$container.append(itemView.$el);
        },
        /**
         *
         */
        manageNavigation : function() {
            if (!this.model)
                this.getModel ();
            var $footer = $(_.template(footerTemplate)(this.model.toJSON())).appendTo (this.$el.find('.panel.panel-default'));
            var $pagination = $footer.find('#page_navigation');
            var total = this.model.get('total');
            var perPage = this.perPage ;
            if (total > perPage) {
                var $last = $pagination.find("#next");
                var indexes = parseInt(total / perPage);
                if ((total % perPage ) > 0) {
                    indexes++;
                }
                for (var i = 1; i < indexes + 1; i++) {
                    $('<li class="page-nav"><a href="#">' + i + '</a></li>').attr({
                        id : i
                    }).insertBefore($last);
                }
                $pagination.show();
            }
        },
        /**
         *
         */
        navigate : function(event) {
            event.preventDefault();
            var value = $(event.currentTarget).find('a:eq(0)').html();
            this.loadPage(value);
        },
        /**
         *
         */
        loadPage : function(index) {
            this.currentIndex = index;
            var data = {
                page : index
            };
            if (this.serverData) {
                if ( typeof (this.serverData) === 'function')
                    data = _.extend(this.serverData(), data);
                else
                    data = _.extend(data, this.serverData);
            };
            var url = data.url || undefined;
            $.get(url || this.collection.url, data, $.proxy(this.successLoadPage, this));
        },
        /**
         *
         */
        successLoadPage : function(response) {
            this.collection.reset(response.list);
        },
        /**
         *
         */
        collectionRendered : function() {
            this.$el.find('#page_index').html(this.currentIndex);
            this.$el.find('.page-nav.active').removeClass('active');
            this.$el.find('.page-nav#' + this.currentIndex).addClass('active');
        },
        /**
         *
         */
        close : function() {
            this.undelegateEvents ();
            this.remove();
        }
    });
    return ListView;
});

