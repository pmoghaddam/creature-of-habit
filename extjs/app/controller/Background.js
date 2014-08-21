Ext.define('Pym.controller.Background', {
    extend: 'Ext.app.Controller',

    models: ['Notification'],
    stores: ['Notifications'],
    notifications: [], // Store inside here
    status: "Stopped",

    startTimer: function() {
        // Stop first 
        this.stopTimer();

        // Create notifications based on stored data
        var store = this.getNotificationsStore();
        store.getProxy().cache = {}; // Forces refresh
        store.load(); // Refresh

        store.each(function(record) {
            var notification = Ext.create(record.get('type'), {
                icon: record.get('icon'),
                title: record.get('title'),
                description: record.get('description'),
                interval: record.get('interval') * 1000 * 60, // Minutes
                quotes: record.get('quotes').split('\n'),
                autoClose: record.get('autoClose') * 1000,
                time: record.getParsedTime()
            });
            notification.start();

            this.notifications.push(notification); // Store to stop later
        }, this);

        // Set status
        this.status = Ext.String.format("Running {0} notifications", this.notifications.length);
    },

    stopTimer: function() {
        for (var i in this.notifications) {
            var notification = this.notifications[i];
            notification.stop();
        }
        this.notifications = []; // Empty
        this.status = "Stopped";
    }
});