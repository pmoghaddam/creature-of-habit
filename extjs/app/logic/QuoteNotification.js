Ext.define('Pym.logic.QuoteNotification', {
    extend: 'Pym.logic.IntervalNotification',

    //----------------------------------------------------------------------------
    //
    // Variables
    //
    //----------------------------------------------------------------------------
    config: {
        quotes: ["Quote #1", "Quote #2", "Quote #3"]
    },

    //----------------------------------------------------------------------------
    //
    // Methods
    //
    //----------------------------------------------------------------------------
    create: function () {
        var index = Math.floor(Math.random() * this.quotes.length);
        return webkitNotifications.createNotification(
            this.icon, // relative url
            this.title, // notification title
            this.quotes[index] // notification body text
        );
    }
})