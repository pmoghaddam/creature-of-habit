Ext.define('Pym.controller.NotificationOptions', {
    extend: 'Ext.app.Controller',

    models: ['Notification', 'Settings'],
    stores: ['Notifications'],

    setupFirstTime: function() {
        var notificationsStore = this.getNotificationsStore();
        notificationsStore.add([{
            type: 'Pym.logic.IntervalNotification',
            title: 'Sit Up Straight',
            description: "Maintain posture as you work! I know it's hard :-)",
            interval: 7
        }, {
            type: 'Pym.logic.IntervalNotification',
            title: 'Stretch Eyes',
            description: "Focus elsewhere, somewhere far, to maintain strong vision",
            interval: 19,
            icon: 'assets/images/eyes.png'
        }, {
            type: 'Pym.logic.IntervalNotification',
            title: 'Stretch',
            description: "Get up and do a full body stretch. You'll feel invigorated!",
            interval: 59,
            icon: 'assets/images/exercise.png'
        }, {
            type: 'Pym.logic.QuoteNotification',
            title: 'Motivational Quotes',
            quotes: ["Courage is the discovery that you may not win, and trying when you know you can lose.",
                "If you only do what you know you can do - you never do very much.",
                "Anyone can give up, it's the easiest thing in the world to do. But to hold it together when everyone else would understand if you fell apart, that's true strength.",
                "Try and fail, but don't fail to try.",
                "Only as high as I reach can I grow, only as far as I seek can I go, only as deep as I look can I see, only as much as I dream can I be.",
                "Fear defeats more people than any other thing in the world.",
                "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
                "Education's purpose is to replace an empty mind with an open one.",
                "I have found the paradox, that if you love until it hurts, there can be no more hurt, only more love.",
                "Dream as if you'll live forever, live as if you'll die today.",
                "You grow up the day you have your first real laugh -- at yourself.",
                "Borrow money from a pessimist - they don't expect it back",
                "I used to think I was indecisive, but now I'm not so sure",
                "Wise men speak because they have something to say; Fools because they have to say something.",
                "God places the heaviest burden on those who can carry its weight.",
                "What is not started today is never finished tomorrow."].join("\n"),
            interval: 43,
            icon: 'assets/images/quote.png'
        }]);
        notificationsStore.sync();
    },

    initSettings: function() {
       // Load up Settings
        var settingsStore = Ext.create('Ext.data.Store', {
            model: 'Pym.model.Settings',
            id: 'Settings'
        });
        settingsStore.load();
        if (settingsStore.count() == 0) {
            // First-time user
            this.settings = Ext.create('Pym.model.Settings');
            settingsStore.add(this.settings); //
            settingsStore.sync();

            this.setupFirstTime(); // Setup templates
        } else {
            this.settings = settingsStore.first();
        }
    },

    init: function() {
        this.initSettings(); // Setup settings model

        // Setup controls
        var notificationsStore = this.getNotificationsStore();
        var tooltip,
            editWindow;
        this.control({
            '.notification-form #save': {
                click: function(btn) {
                    var form = btn.up('form').getForm();
                    if (form.isValid()) {
                        var values = form.getValues();
                        var record = form.getRecord();
                        record.set(values);
                        record.save();
                        record.commit();

                        btn.up('window').close(); // Close
                    }
                }
            },
            '.notification-form #add': {
                click: function(btn) {
                    var form = btn.up('form').getForm();
                    if (form.isValid()) {
                        var values = form.getValues();
                        notificationsStore.add(values);
                        notificationsStore.sync();

                        btn.up('window').close(); // Close
                    }
                }
            },
            '.notification-form #cancel': {
                click: function(btn) {
                    var win = btn.up('window');
                    win.close();
                }
            },
            '.summary-window #edit': {
                click: function(btn) {
                    var summaryWindow = btn.up('window');
                    var record = summaryWindow.record;
                    var win = Ext.create('Pym.view.notification.FormWindow', {
                        width: 500,
                        title: 'Edit Notification',
                        items: [
                            {
                                xtype: 'notification-form',
                                buttons: [
                                    {
                                        id: 'save',
                                        text: 'Save'
                                    },
                                    {
                                        id: 'cancel',
                                        text: 'Cancel'
                                    }
                                ]
                            }
                        ]
                    });
                    var form = win.down('form').getForm();
                    form.loadRecord(record);
                    win.show();
                }
            },
            '.summary-window #delete': {
                click: function(btn) {
                    var summaryWindow = btn.up('window');
                    var record = summaryWindow.record;
                    notificationsStore.remove(record);
                    record.destroy();
                    summaryWindow.close();
                }
            },
            '#menu-add': {
                click: function(btn) {
                    var win = Ext.create('Pym.view.notification.FormWindow', {
                        width: 500,
                        items: [
                            {
                                xtype: 'notification-form',
                                buttons: [
                                    {
                                        id: 'add',
                                        text: 'Add'
                                    },
                                    {
                                        id: 'cancel',
                                        text: 'Cancel'
                                    }
                                ]
                            }
                        ]
                    });
                    var emptyRecord = Ext.create('Pym.model.Notification');
                    win.down('form').loadRecord(emptyRecord);
                    win.show();
                }
            },
            '#notification-tile': {
                selectionchange: function(mode, records) {
                    if (editWindow)
                        editWindow.destroy();
                    if (records.length == 0)
                        return;

                    // Create options menu
                    var tile = mode.view;
                    var item = tile.mouseOverItem;
                    x = tile.getPosition()[0] + item.offsetLeft + item.offsetWidth + 5;
                    y = tile.getPosition()[1] + item.offsetTop;
                    editWindow = Ext.create('Pym.view.notification.SummaryWindow', {
                        record: records[0] // Pass it along
                    });
                    editWindow.showAt(x, y);
                },
                itemmouseenter: function(tile, record, item, index, event) {
                    var content = Ext.util.Format.ellipsis(record.getContent(), 150);
                    // Manually determine location of tool tip
                    var x = tile.getPosition()[0] + item.offsetLeft;
                    var y = tile.getPosition()[1] + item.offsetTop + item.offsetHeight + 5;
                    tooltip = Ext.create('Ext.tip.ToolTip', {
                        width: 200,
                        autoHide: false,
                        title: record.get("title"),
                        html: content
                    });
                    tooltip.showAt([x, y])
                },
                itemmouseleave: function(tile, record, item, index, event) {
                    tooltip.destroy();
                },
                itemdblclick: function(tile, record) {
                    alert("Double Click");
                }
            },
            '#clear-all': {
                click: function() {
                    Ext.Msg.prompt('Confirm', 'Please type in CONFIRM to delete all notifications:', function(btn, text) {
                        if (btn == 'ok' && text == 'CONFIRM') {
                            notificationsStore.removeAll();
                            notificationsStore.purgeRecords();
                        }
                    });
                }
            }
        });

        // HTML Listeners
        Ext.get('about-link').on('click', function() {
            Ext.Msg.alert('Creature of Habit', 'This is an beta release of Creature of Habit!');
        });
        Ext.get('terms-link').on('click', function() {
            Ext.Msg.alert('Terms of Use', 'THERE IS ABSOLUTELY NO WARRANTY ON THIS! USE AT OWN RISK!');
        });
    }

});