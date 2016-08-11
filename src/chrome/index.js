var _ = require('lodash');
var config = require('./config');

_.forEach(config.modules, function(module_name) {
    require('./modules/' + module_name);
});
