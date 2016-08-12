var units = require('../data/units');
var speedTime = require('./speedTime');
var _ = require('lodash');

module.exports = function(time, dist) {
    var matchs;
    var min_diff = Infinity;
    _.forEach(units, function(unit) {
        var diff = Math.abs(speedTime(unit,  dist) - time);
        if(diff < min_diff) {
            min_diff = diff;
            matchs = [unit];
        }
        else if (diff === min_diff) {
            matchs.push(unit);
        }
    });
    return matchs;
};
