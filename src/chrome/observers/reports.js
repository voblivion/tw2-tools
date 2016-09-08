var _ = require('lodash');
var $ = require('jquery');
var strToDate = require('../../utils/strToDate');
var strToPosition = require('../../utils/strToPosition');
var server = require('../../utils/server');

module.exports = {
    element: '[ng-if="data.type === REPORT_TYPES.scouting"]',
    add: function(node) {
        var report = {
            server: server,
            type: 'report'
        };

        // Récupérer la date du rapport
        var wrapper = $(node).parents().eq(3);
        var datetime = $('.report-date', wrapper).text();
        var ts = strToDate(datetime).format('X');
        report.date = ts;

        // Récupérer le village espionné
        var def_div = $('th:contains(Défenseur)', node).parents().eq(2);
        report.player = $('span:contains(Défenseur)', def_div).next().text();
        var def_village_div = $('span:contains(Village)', def_div).next();
        var def_village = def_village_div.text().match(/[\w\s]+(.*)/)[1];
        var position = strToPosition(def_village);
        report.x = position.x;
        report.y = position.y;

        // Espionnage de bâtiments
        var units_w = $('[ng-show="report[type].units"]:not(.ng-hide)', node);
        if(units_w.length) {
            var units_div = $('.report-unit', units_w);
            _.forEach(units_div, function(unit_div) {
                var name_div = $('>:first-child', unit_div);
                var name = name_div.attr('class').match(/icon-34x34-unit-(\w+)/)[1];
                var count = name_div.next().attr('tooltip-content').replace(/\s/, '');
                report[name] = parseInt(count);
            });

            $.post('https://drouin.io/tw2/units.php', report);
        }
        var buildings_w = $('[ng-show="report[type].buildings"]:not(.ng-hide)', node);
        if(buildings_w.length) {
            var buildings_tr = $('tbody tr', buildings_w);
            _.forEach(buildings_tr, function(building_tr) {
                var name_span = $('>:first-child span', building_tr);
                var name = name_span.attr('class').match(/icon-34x34-building-(\w+)/)[1];
                var level = $('>:last-child', building_tr).text();
                report[name] = parseInt(level);
            });

            $.post('https://drouin.io/tw2/buildings.php', report);
        }
    }
};
