var moment = require('moment');

moment.locale('fr');

module.exports = function(str) {
    if(/Aujourd'hui/i.test(str)) {
        str = moment().format('ll') + ' ' + str.match(/(\d+:\d+:\d+)/)[1];
    }
    else if(/Hier/i.test(str)) {
        str = moment().add(-1, 'days').format('ll') + ' ' + str.match(/(\d+:\d+:\d+)/)[1];
    }
    return moment(str, 'DD MMMM YYYY HH:mm:ss');
};
