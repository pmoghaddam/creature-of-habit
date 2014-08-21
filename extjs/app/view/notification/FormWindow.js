Ext.define('Pym.view.notification.FormWindow', {
    extend: 'Ext.window.Window',
    title: 'Add Notification',
    layout: 'fit',
    modal: true,
    expandOnShow: true,
    items: [
        {
            xtype: 'notification-form',
            border: false,
            title: false
        }
    ],
    listeners: {
        scope: this,
        resize: function(win) {
            win.center(); // Always keep it centered
        }
    }
});