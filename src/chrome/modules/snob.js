var $ = require('jquery');

var visible = false;

var global_observer = new MutationObserver(function() {
    var overviewIncoming = $('[ng-controller="OverviewIncomingController"]');

    if(overviewIncoming.length > 0) {
        if(!visible) {
            visible = true;
            // Start
        }
        else {
            // Update
        }
    }
    else {
        visible = false;
    }
});

global_observer.observe(document, {
    subtree: true,
    attributes: true,
    childList: true
});
