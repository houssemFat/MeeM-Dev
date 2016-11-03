define(['app'], function(App) {

    return {
        /**
         *
         */
        routes : {
            // video
            "collaboration/invitations/sent" : "CollaborationInvitationSent",
            "collaboration/invitations/recieved" : "CollaborationInvitationRecieved",
        },
        // #fix Me
        prototype : {
            /**
             *
             */
            CollaborationInvitationSent : function() {
                App.router.collaborationManager(function() {
                    require(['scripts/main/collections/collaboration/invitation'], function(InvitationCollection) {
                        $.get(InvitationCollection.prototype.url + 'sent/', {}, function(response) {
                            require(['scripts/main/views/collaboration/invitation/list'], function(ListView) {

                                var view = new ListView({
                                    collection : new InvitationCollection(response.list),
                                    type : 'sent'
                                });
                                App.Manager.updateRegion(view, 'invitations/sent');
                            });
                        });
                    });
                }, null);
            },
            /**
             *
             */
            /**
             *
             */
            CollaborationInvitationRecieved : function() {
                App.router.collaborationManager(function() {
                    require(['scripts/main/collections/collaboration/invitation'], function(InvitationCollection) {
                        $.get(InvitationCollection.prototype.url + 'recieved/', {}, function(response) {
                            require(['scripts/main/views/collaboration/invitation/list'], function(ListView) {
                                var view = new ListView({
                                    collection : new InvitationCollection(response.list),
                                    type : 'recieved'
                                });
                                App.Manager.updateRegion(view, 'invitations/recieved');

                            });
                        });
                    });
                }, null);
            },
        },
    };
});
