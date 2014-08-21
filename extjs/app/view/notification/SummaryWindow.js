Ext.define('Pym.view.notification.SummaryWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.summary-window',
    border: false,
    preventHeader: true,
    plain: true,
    resizable: false,
    expandOnShow: true,
    record: null, // Passed in
    items: {
        xtype: 'container',
        layout: 'anchor',
        width: 100,
        defaults: {
            xtype: "button",
            anchor: '100%',
            padding: '5 0',
            margin: '1 0'
        },
        items: [
            {
                id: 'edit',
                text: 'Edit'
            },
            {
                id: 'delete',
                text: 'Delete',
                cls: 'pym-delete-button'
            }
        ]
    }
});