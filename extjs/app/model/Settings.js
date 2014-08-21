Ext.define('Pym.model.Settings', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'localstorage',
        id  : 'notifications-settings'
    }
});