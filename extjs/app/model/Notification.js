Ext.define('Pym.model.Notification', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',    type: 'int'},
        {name: 'type',  type: 'string'},
        {name: 'title',    type: 'string'},
        {name: 'description',    type: 'string'},
        {name: 'icon',    type: 'string', defaultValue: 'assets/images/alarm.png'},
        {name: 'interval',    type: 'float'},
        {name: 'quotes',    type: 'string'},
        {name: 'autoClose', type: 'float', defaultValue: 0},
        {name: 'disabled', type: 'boolean', defaultValue: false},
        {name: 'time', type: 'string'}
    ],
    proxy: {
        type: 'localstorage',
        id  : 'notifications'
    },

    // Helper functions
    getContent: function() {
        switch (this.get('type')) {
            case 'Pym.logic.IntervalNotification':
                return this.get('description');
                break;
            case 'Pym.logic.QuoteNotification':
                return this.get('quotes');
                break;
        }
    },

    getParsedTime: function() {
        return Ext.Date.parse(this.get('time'), 'g:i A');
    }
});