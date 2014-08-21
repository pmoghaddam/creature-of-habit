Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.application({
    name: "Pym",
    appFolder: "extjs/app",
    controllers: ['NotificationOptions'], // Necessary to start up init
    launch: function() {
        Ext.create('Pym.view.OptionsViewport');
    }
});