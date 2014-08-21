Ext.define('Pym.view.OptionsViewport', {
    extend: 'Ext.container.Viewport',
    requires: ['Pym.view.notification.Form',
        'Pym.view.notification.FormWindow'],
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    id: 'optionsViewport',
    initComponent: function() {
        this.items =
            [
                {
                    xtype: 'component',
                    width: 950,
                    contentEl: "header"
                },
                {
                    xtype: 'panel',
                    width: 950,
                    height: 500,
                    bodyPadding: 10,
                    layout: 'border',
                    bbar: [
                        {
                            id: 'menu-add',
                            text: 'Add Notification',
                            iconCls: 'icon-add-32',
                            scale: 'large'
                        },
                        '->',
                        {
                            id: 'clear-all',
                            text: 'Delete All Notifications',
                            iconCls: 'icon-stop-32',
                            scale: 'large'
                        }
                    ],
                    items: [
                        Ext.create('Pym.view.notification.Tile', {
                            region: 'center'
                        })
                    ]
                },
                {
                    xtype: 'component',
                    width: 950,
                    contentEl: "footer"
                }
            ];

        this.callParent(arguments);
    }

});