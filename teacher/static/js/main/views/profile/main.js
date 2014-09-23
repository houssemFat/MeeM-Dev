define(['jquery', 'underscore', 'backbone', 'modelbinding', 'MVBinder', 'marionette',  'scripts/main/views/profile/menu', 'text!scripts/main/templates/profile/main.html', 'app', 'manager','commonUpload'], function($, _, Backbone, ModelBinding, MVBinder, Marionette,  ProfileMenu, template, App, Manager) {
    /*
     */
    return Manager.extend({
        /**
         *
         */
        template : _.template(template),
        /**
         * 
         */
        formBindings : {
            'change form#username' : 'username',
            'change form#name' : 'name',
            'change form#lastname' : 'lastname',
            'change form#bio' : 'bio',
            'change form#skills' : 'skills',
            'change form#hobbies' : 'hobbies',
            'change form#facebook_link' : 'facebook_link',
            'change form#twitter_link' : 'twitter_link',
            'change form#google_plus_link' : 'google_plus_link',
        },
        /**
         * 
         */
        events : {
            'click #edit' : function(event) {
                this.$editContainer.removeClass('hidden');
                this.$viewContainer.addClass('hidden');
            },
            'click #save' : 'save',
        },
        /**
         *
         * @param {Object} options
         */
        initialize : function(options) {
            App.ProfileManager = this;
            this.mainRegion = new Backbone.Marionette.Region({
                el : this.$el.find("#profile_container")
            });
            this.$el.html(this.template(this.model.toJSON()));
            this.$viewContainer = this.$el.find('#profile_container');
            this.$editContainer = this.$el.find('#profile_container_edit');
            ModelBinding.bind(this);
            //this.menu = new ProfileMenu ('collaboration', this);
            App.Menu.hide();
            //
            var scope = this;
            this.CoverUploader = new common.fileUploader(this.$el, 'cover_file', 'cover_file', {
                exts : 'png gif jpeg jpg'.split(' '),
                url : this.model.profileUrl ('cover/'),
                success : function(response) {
                    scope.changeCoverCallBack(response);
                },
                progress : this.progressScriptFn,
                scope : this,
                data : this.model.toJSON(),
                filename : 'cover_file',
                firenow : true
            });
        },
        /**
         * 
         */
        changeCoverCallBack : function(response) {
            this.$el.find('#cover_image').attr({
                'src' : response.cover
            });
            this.$el.find('.app-profile-pic-upload fa').removeClass('fa-spinner').addClass('fa-upload');
        },
        /**
         * 
         */
        progressScriptFn : function(response) {
            this.$el.find('.app-profile-pic-upload fa').removeClass('fa-upload').addClass('fa-spinner');
        },
        /**
         *
         * @param {String} active
         */
        updateMenu : function(href) {
            this.menu.hilightActiveItem(href);
        },
        /**
         *
         */
        save : function(event) {
            event.preventDefault();
            var model = this.model;
            var data = model.toJSON() ;
            model.save({}, {
                url : this.model.profileUrl (),
                data :  data,
                success : $.proxy(this.success, this),
                error : this.error,
                wait : true
            });
        },
        /**
         * 
         */
        success : function (response){
            var model = this.model;
            this.formatMultiple ('hobbies_view', model.get('hobbies'));
            this.formatMultiple ('skills_view', model.get('skills'));
            MVBinder.bind(this);
            this.$editContainer.addClass('hidden');
            this.$viewContainer.removeClass('hidden');
        },
        /**
         *  
         */
        formatMultiple : function (id, value){
            var format = '<span class="tags"></span>&nbsp;';
            var $el = this.$el.find('#' + id).empty();
            var items = value.split(',') ;
            for (var i in items){
                $el.append($(format).html(items[i])); 
            }
        },
        /**
         * 
         */
        error : function (response){
            App.vent.trigger('alert', {
                msg : response.message ? common.tr('response.message') : MMC.tr('an error has occurred, try again'),
                type : 'danger'
            });
        },
        /**
         *
         */
        close : function() {
            App.ProfileManager = null;
            this.remove();
        }
    });
});
