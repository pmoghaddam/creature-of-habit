Ext.define('Pym.logic.IntervalNotification', {
    extend: 'Pym.logic.Notification',

    //----------------------------------------------------------------------------
    //
    // Variables
    //
    //----------------------------------------------------------------------------
    config: {
        interval: 1000, // In milliseconds
        autoClose: 1000 * 5 // In milliseconds
    },

    intervalId: 0,
    timeoutId: false,

    //----------------------------------------------------------------------------
    //
    // Methods
    //
    //----------------------------------------------------------------------------
    start: function () {
        // Stop first if running
        this.stop();

        // Setup interval pop-up
        var inst = this;
        this.intervalId = setInterval(function() {
            if (inst.showing)
                return; // Prevent duplicate notification

            inst.chromeNotification = inst.create();
            inst.chromeNotification.show();

            // Automatically cancel if applicable
            if (inst.autoClose > 0) {
                this.timeoutId = setTimeout(inst.onAutoClose, inst.autoClose, inst);
            }
        }, this.interval);
    },

    onAutoClose: function(instance) {
        if (instance.chromeNotification)
            instance.chromeNotification.cancel();
    },

    stop: function () {
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
        this.callParent(arguments);
    }

});