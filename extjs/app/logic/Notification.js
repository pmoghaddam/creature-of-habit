Ext.define('Pym.logic.Notification', {
    //----------------------------------------------------------------------------
    //
    // Variables
    //
    //----------------------------------------------------------------------------
    config: {
        icon: 'assets/images/info.png',
        title: 'Notification title',
        description: 'Empty notification description'
    },

    showing: false,
    chromeNotification: null,

    //----------------------------------------------------------------------------
    //
    // Constructor
    //
    //----------------------------------------------------------------------------
    constructor: function(config) {
        this.initConfig(config);
        return this;
    },

    //----------------------------------------------------------------------------
    //
    // Methods
    //
    //----------------------------------------------------------------------------
    create: function () {
        var notification = webkitNotifications.createNotification(
            this.icon, // relative url
            this.title, // notification title
            this.description // notification body text
        );
        notification.ondisplay = this.onDisplay;
        notification.onclose = this.onClose;
        notification.inst = this;
        return notification;
    },
    start: function () {
        // Stop first if running
        this.stop();

        this.chromeNotification = this.create();
        this.chromeNotification.show();
    },
    stop: function() {
        if (this.chromeNotification) {
            this.chromeNotification.cancel();
            this.chromeNotification = null;
        }
    },
    onDisplay: function() {
        this.inst.showing = true;
    },
    onClose: function() {
        this.inst.showing = false;
    }
});