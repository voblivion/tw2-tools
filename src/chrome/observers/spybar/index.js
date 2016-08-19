var _ = require('lodash');
var $ = require('jquery');
var moment = require('moment');
var units = require('../../../data/units');
var buildings = require('../../../data/buildings');
var strToPosition = require('../../../utils/strToPosition');
var server = require('../../../utils/server');
require('./style.less');

var last_position;
module.exports = {
    element: '#map-tooltip',
    add: function() {

        // Ajouter la spybar au dom
        var spybar = $('<div></div>');
        spybar.addClass('twx-window');
        spybar.attr('id', 'spybar');
        spybar.hide();

        // Préparer le header de la spybar
        var spybar_header = $('<header></header>');
        spybar_header.addClass('win-head');
        var spybar_title = $('<h2></h2>');
        spybar_title.text('Spybar');
        spybar_header.append(spybar_title);
        spybar.append(spybar_header);

        // Préparer les data
        var spybar_main = $('<section></section>');
        spybar_main.addClass('win-main');
        var spybar_unit = $('<div></div>');
        spybar_unit.addClass('spybar-tile');
        var unit_icon_wrapper = $('<div></div>');
        var unit_icon = $('<span></span>');
        unit_icon.addClass('tw2-tools icon-bg-black icon-34x34-');
        unit_icon_wrapper.append(unit_icon);
        spybar_unit.append(unit_icon_wrapper);
        var unit_date = $('<div></div>');
        unit_date.attr('id', 'spybar-units-date');
        spybar_unit.append(unit_date);
        spybar_main.append(spybar_unit);
        _.forEach(units, function(unit, name) {
            var spybar_unit = $('<div></div>');
            spybar_unit.addClass('spybar-tile');
            var unit_icon_wrapper = $('<div></div>');
            var unit_icon = $('<span></span>');
            unit_icon.addClass('tw2-tools icon-34x34-unit-' + name);
            unit_icon_wrapper.append(unit_icon);
            spybar_unit.append(unit_icon_wrapper);
            var unit_count = $('<div></div>');
            unit_count.attr('id', 'spybar-' + name + '-count');
            spybar_unit.append(unit_count);
            spybar_main.append(spybar_unit);
        });
        var spybar_building = $('<div></div>');
        spybar_building.addClass('spybar-tile');
        var building_icon_wrapper = $('<div></div>');
        var building_icon = $('<span></span>');
        building_icon.addClass('tw2-tools icon-bg-black icon-34x34-');
        building_icon_wrapper.append(building_icon);
        spybar_building.append(building_icon_wrapper);
        var building_date = $('<div></div>');
        building_date.attr('id', 'spybar-buildings-date');
        spybar_building.append(building_date);
        spybar_main.append(spybar_building);
        _.forEach(buildings, function(building, name) {
            var spybar_building = $('<div></div>');
            spybar_building.addClass('spybar-tile');
            var building_icon_wrapper = $('<div></div>');
            var building_icon = $('<span></span>');
            building_icon.addClass('tw2-tools icon-34x34-building-' + name);
            building_icon_wrapper.append(building_icon);
            spybar_building.append(building_icon_wrapper);
            var building_count = $('<div></div>');
            building_count.attr('id', 'spybar-' + name + '-count');
            spybar_building.append(building_count);
            spybar_main.append(spybar_building);
        });
        spybar.append(spybar_main);

        $(document.body).append(spybar);

        var map_tooltip = $('#map-tooltip');

        function update_buildings(data) {
            $.get('https://drouin.io/tw2/buildings.php', data).then(function(data) {
                if(data.id === undefined) {
                    building_date.text('Jamais');
                    _.forEach(buildings, function(building, name) {
                        $('#spybar-' + name + '-count').text('?');
                    });
                }
                else {
                    var diff = moment.utc(moment().diff(moment.unix(data.date)));
                    building_date.text(diff.format('DDDj h:mm:ss'));
                    _.forEach(buildings, function(building, name) {
                        $('#spybar-' + name + '-count').text(data[name]);
                    });
                }
            });
        }

        function update_units(data) {
            $.get('https://drouin.io/tw2/units.php', data).then(function(data) {
                if(data.id === undefined) {
                    unit_date.text('Jamais');
                    _.forEach(units, function(unit, name) {
                        $('#spybar-' + name + '-count').text('?');
                    });
                }
                else {
                    var diff = moment.utc(moment().diff(moment.unix(data.date)));
                    unit_date.text(diff.format('DDDj h:mm:ss'));
                    _.forEach(units, function(unit, name) {
                        $('#spybar-' + name + '-count').text(data[name]);
                    });
                }
            });
        }

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(mutation.attributeName === 'class'
                        && $(mutation.target).is('#map-tooltip')) {
                    if(map_tooltip.hasClass('ng-hide')) {
                        spybar.hide();
                    }
                    else {
                        var village_name = $('.village-name', map_tooltip).text();
                        var position = strToPosition(village_name);
                        position.server = server;
                        if(!_.isEqual(position, last_position)) {
                            last_position = position;
                            update_buildings(position);
                            update_units(position);
                        }
                        spybar.show();
                    }
                }
            });
        });
        var observer_config = {
            attributes: true
        };
        var target_node = map_tooltip[0];
        observer.observe(target_node, observer_config);
    }
};
