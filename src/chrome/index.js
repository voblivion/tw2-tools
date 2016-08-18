var _ = require('lodash');
var $ = require('jquery');
var observers = require('./observers');

// L'observateur écoute les changement du dom et redistribue aux observers
var global_observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        _.forEach(observers, function(observer) {
            mutation.addedNodes.forEach(function(node) {
                if($(node).is(_.get(observer, 'element'))) {
                    _.invoke(observer, 'add', node);
                }
            });
            mutation.removedNodes.forEach(function(node) {
                if($(node).is(_.get(observer, 'element'))) {
                    _.invoke(observer, 'remove', node);
                }
            });
        });
    });
});

// Démarrer l'observateur sur tout le dom avec le body comme racine
var observer_config = {
    childList: true,
    attributes: true,
    subtree: true
};
var target_node = document.body;
global_observer.observe(target_node, observer_config);
