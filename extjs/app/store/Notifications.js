Ext.define('Pym.store.Notifications', {
    extend: 'Ext.data.Store',
    requires: 'Pym.model.Notification',
    model: 'Pym.model.Notification',

    id: 'Notifications', //TODO: Autoset name?
    autoLoad: true,
    autoSync: true
});