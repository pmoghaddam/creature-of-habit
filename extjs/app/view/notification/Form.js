Ext.define('Pym.view.notification.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.notification-form',
    bodyPadding: 10,
    border: false,
    defaults: {
        xtype: 'textfield',
        msgTarget: 'side',
        anchor: '100%'
    },
    store: 'Notifications',
    buttons: [
        {
            id: 'add',
            text: 'Add'
        },
        '-',
        {
            id: 'save',
            text: 'Save'
        }
    ],

    initComponent: function() {
        var typeStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                {name : 'Timed',    value: 'Pym.logic.TimedNotification'},
                {name : 'Interval',   value: 'Pym.logic.IntervalNotification'},
                {name : 'Quotations',  value: 'Pym.logic.QuoteNotification'}
            ]
        });
        var iconStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                {name : 'Blank',   value: 'assets/images/blank.png'},
                {name : 'Alarm',   value: 'assets/images/alarm.png'},
                {name : 'Exercise',  value: 'assets/images/exercise.png'},
                {name : 'Eyes', value: 'assets/images/eyes.png'},
                {name : 'Quote', value: 'assets/images/quote.png'}
            ]
        });

        this.items = [
            {
                xtype: 'combo',
                fieldLabel: 'Type',
                name: 'type',
                displayField: 'name',
                valueField: 'value',
                mode: 'local',
                store: typeStore,
                allowBlank: false,
                forceSelection: true,
                listeners: {
                    scope: this,
                    change: function(combo) {
                        // OPTIMIZE: Hide and show logic is not very DRY
                        this.down('#basic-settings').show();
                        
                        // Reset form
                        this.down('textarea[name="quotes"]').hide();
                        this.down('textarea[name="description"]').hide();
                        this.down('numberfield[name="interval"]').hide();
                        this.down('timefield[name="time"]').hide();

                        // Re-display
                        var value = combo.getValue();
                        switch (value) {
                            case 'Pym.logic.TimedNotification':
                                this.down('#basic-settings').setTitle('Timed Settings');
                                this.down('textarea[name="description"]').show();
                                this.down('timefield[name="time"]').show();
                                break;
                            case 'Pym.logic.IntervalNotification':
                                this.down('#basic-settings').setTitle('Interval Settings');
                                this.down('textarea[name="description"]').show();
                                this.down('numberfield[name="interval"]').show();
                                break;
                            case 'Pym.logic.QuoteNotification':
                                this.down('#basic-settings').setTitle('Quote Settings');
                                this.down('textarea[name="quotes"]').show();
                                this.down('numberfield[name="interval"]').show();
                                break;
                        }
                    }
                }
            },
            {
                xtype: 'fieldset',
                id: 'basic-settings',
                hidden: true,
                defaults: {
                    xtype: 'textfield',
                    msgTarget: 'side',
                    anchor: '100%'
                },
                items: [
                    {
                        fieldLabel: 'Title',
                        name: 'title',
                        allowBlank: false
                    },
                    {
                        xtype: 'textarea',
                        fieldLabel: 'Description',
                        height: 100,
                        name: 'description'
                    },
                    {
                        xtype: 'textarea',
                        fieldLabel: 'Quotes (quote per line)',
                        height: 150,
                        name: 'quotes'
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Interval (min)',
                        name: 'interval'
                    },
                    {
                        xtype: 'timefield',
                        name: 'time',
                        fieldLabel: 'Time'
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Icon',
                        name: 'icon',
                        displayField: 'name',
                        valueField: 'value',
                        mode: 'local',
                        store: iconStore,
                        allowBlank: false,
                        listConfig: {
                            getInnerTpl: function() {
                                return "<div class='icon-list-entry'>" +
                                        "<img src='{value}' width='20' height='20'/>" +
                                        "<span>{name}</span>" + 
                                    "</div>";
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'fieldset',
                collapsible: true,
                collapsed: true,
                title: 'Optional',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Auto-close (sec)',
                        name: 'autoClose'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});