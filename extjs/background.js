Ext.Loader.setConfig({
    enabled:true,
    disableCaching:false
});

var Pym = Ext.create('Ext.app.Application', {
    name:"Pym",
    appFolder:"extjs/app",
    controllers:['Background'], // Necessary to start up init
    launch:function () {
        // Start it up by default
        var bgController = this.getController('Background');
        bgController.startTimer();
    }
});