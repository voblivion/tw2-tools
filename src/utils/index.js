var _ = require('lodash');

module.exports = {
    sum: function(obj) {
        var sum = 0;
        _.forEach(obj, function(value) {
            sum += value;
        });
        return sum;
    }
};
