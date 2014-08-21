var bg = chrome.extension.getBackgroundPage();
Ext.onReady(function() {
    var bgController = bg.Pym.getController('Background');
    Ext.get('pym-start').on('click', function() {
        bgController.startTimer();
        Ext.get('status').update(bgController.status);
    });
    Ext.get('pym-stop').on('click', function() {
        bgController.stopTimer();
        Ext.get('status').update(bgController.status);
    });
    Ext.get('options-link').set({href: chrome.extension.getURL("options.html")});
    Ext.get('status').update(bgController.status);
})