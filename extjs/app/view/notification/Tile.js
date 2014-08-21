Ext.define('Pym.view.notification.Tile', {
    extend: 'Ext.view.View',
    id: 'notification-tile',

    trackOver: true,
    overItemCls: 'notification-over',
    itemSelector: 'div.notification', // Defines a single item, very important

    tpl: [
        '<tpl for=".">',
        '<div class="notification">',
        '<div class="type {cls}"></div>',
        '<div class="icon"><img height="48" width="48" src="{iconUrl}" title="{title}"></div>',
        '<div class="title">{shortName}</div>',
        '<div class="interval">{intervalMinutes}</div>',
        '</div>',
        '</tpl>'
    ],
    store: 'Notifications',
    emptyText: 'No notifications to display',

    prepareData: function(data) {
        // Human timing
        var humanTiming,
            cls;
        switch (data.type) {
            case 'Pym.logic.TimedNotification':
                cls = "clock";
                if (data.time)
                    humanTiming = Ext.String.format("At {0}", data.time);
                break;
            case 'Pym.logic.IntervalNotification':
                cls = "alarm";
                humanTiming = Ext.String.format("Every {0} minutes", data.interval);
                break;
            case 'Pym.logic.QuoteNotification':
                cls = "quote";
                humanTiming = Ext.String.format("Every {0} minutes", data.interval);
                break;
        }

        Ext.apply(data, {
            cls: cls,
            iconUrl: (Ext.String.trim(data.icon).length == 0) ? 'assets/images/blank.png' : data.icon,
            shortName: Ext.util.Format.ellipsis(data.title, 20),
            intervalMinutes: humanTiming
        });
        return data;
    }
});