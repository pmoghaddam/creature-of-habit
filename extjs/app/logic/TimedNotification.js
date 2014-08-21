Ext.define('Pym.logic.TimedNotification', {
    extend: 'Pym.logic.Notification',

    //----------------------------------------------------------------------------
    //
    // Variables
    //
    //----------------------------------------------------------------------------
    config: {
        time: new Date() // Currently assume repeat everyday
    },

    timeoutId: false,

    //----------------------------------------------------------------------------
    //
    // Methods
    //
    //----------------------------------------------------------------------------
    start: function () {
        // Stop first if running
        this.stop();

        // Determine time difference
        var milliseconds = this.calculateMilliseconds();

        // Create and set it up
        var inst = this;
        this.chromeNotification = this.create();
        this.timeoutId = setTimeout(this.onTimeout, milliseconds, this)
    },

    stop: function() {
        clearTimeout(this.timeoutId);
        this.callParent(arguments);
    },

    onTimeout: function(instance) {
        instance.chromeNotification.show()
        
        // Reset for next display
        var milliseconds = instance.calculateMilliseconds();
        instance.timeoutId = setTimeout(instance.onTimeout, milliseconds, instance)
    },

    calculateMilliseconds: function () {
        // Determine time difference
        var now = new Date();
        var future = new Date(now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            this.time.getHours(),
            this.time.getMinutes(),
            this.time.getSeconds(),
            this.time.getMilliseconds());
        var milliseconds = future - now;
        if (milliseconds < 0)
            milliseconds += 1000*60*60*24; // If it's after time, try again in 24 hours
        return milliseconds;
    }
})