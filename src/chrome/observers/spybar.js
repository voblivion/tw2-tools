var _ = require('lodash');
var $ = require('jquery');
var moment = require('moment');
var units = require('../../data/units');
var buildings = require('../../data/buildings');
var strToPosition = require('../../utils/strToPosition');

var last_position;
module.exports = {
    element: '#map-tooltip',
    add: function() {

        // Ajouter la spybar au dom
        var spybar = $('<div></div>');
        spybar.attr('id', 'spybar');
        spybar.css({
            'position': 'fixed',
            'bottom': '0',
            'z-index': '9999',
            'width': '100%',
            'background': 'rgb(205, 169, 130)'
        });
        spybar.hide();

        // Ajouter les unités au dom
        var spybar_units = $('<div></div>');
        var spybar_units_header = $('<header></header>');
        var spybar_units_data = $('<table></table>');
        spybar_units_data.css({
            'border-spacing': '1px'
        });
        var units_icon_tr = $('<tr></tr>');
        var units_count_tr = $('<tr></tr>');
        _.forEach(units, function(unit, name) {
            // Icon
            var unit_icon_td = $('<td></td>');
            unit_icon_td.css({
                'border': '1px solid rgb(171, 123, 77)',
                'color': 'black',
                'padding': '2px'
            });
            var unit_icon = $('<span></span>');
            unit_icon.addClass('tw2-tools icon-34x34-unit-' + name);
            unit_icon_td.append(unit_icon);
            units_icon_tr.append(unit_icon_td);
            // Count
            var unit_count_td = $('<td></td>');
            unit_count_td.css({
                'border': '1px solid rgb(171, 123, 77)',
                'color': 'black',
                'padding': '2px'
            });
            unit_count_td.attr('id', 'spybar-' + name + '-count');
            units_count_tr.append(unit_count_td);
        });
        spybar_units_data.append(units_icon_tr);
        spybar_units_data.append(units_count_tr);
        spybar_units.append(spybar_units_header);
        spybar_units.append(spybar_units_data);
        spybar.append(spybar_units);

        // Ajouter les batiments au dom
        var spybar_buildings = $('<div></div>');
        var spybar_buildings_header = $('<header></header>');
        var spybar_buildings_data = $('<table></table>');
        spybar_buildings_data.css({
            'border-spacing': '1px'
        });
        var buildings_icon_tr = $('<tr></tr>');
        var buildings_count_tr = $('<tr></tr>');
        _.forEach(buildings, function(building, name) {
            // Icon
            var building_icon_td = $('<td></td>');
            building_icon_td.css({
                'border': '1px solid rgb(171, 123, 77)',
                'color': 'black',
                'padding': '2px'
            });
            var building_icon = $('<span></span>');
            building_icon.addClass('tw2-tools icon-34x34-building-' + name);
            building_icon_td.append(building_icon);
            buildings_icon_tr.append(building_icon_td);
            // Count
            var building_count_td = $('<td></td>');
            building_count_td.css({
                'border': '1px solid rgb(171, 123, 77)',
                'color': 'black',
                'padding': '2px'
            });
            building_count_td.attr('id', 'spybar-' + name + '-count');
            buildings_count_tr.append(building_count_td);
        });
        spybar_buildings_data.append(buildings_icon_tr);
        spybar_buildings_data.append(buildings_count_tr);
        spybar_buildings.append(spybar_buildings_header);
        spybar_buildings.append(spybar_buildings_data);
        spybar.append(spybar_buildings);

        $(document.body).append(spybar);

        var map_tooltip = $('#map-tooltip');

        function update_buildings(position) {
            $.get('https://drouin.io/tw2/buildings.php', position).then(function(data) {
                if(data.id === undefined) {
                    spybar_buildings_header.text('Aucune donnée');
                    _.forEach(buildings, function(building, name) {
                        $('#spybar-' + name + '-count').text('?');
                    });
                }
                else {
                    spybar_buildings_header.text('Mise à jour le '
                            + moment.unix(data.date).format('lll'));
                    _.forEach(buildings, function(building, name) {
                        $('#spybar-' + name + '-count').text(data[name]);
                    });
                }
            });
        }

        function update_units(position) {
            $.get('https://drouin.io/tw2/units.php', position).then(function(data) {
                if(data.id === undefined) {
                    spybar_units_header.text('Aucune donnée');
                    _.forEach(units, function(unit, name) {
                        $('#spybar-' + name + '-count').text('?');
                    });
                }
                else {
                    spybar_units_header.text('Mise à jour le '
                            + moment.unix(data.date).format('lll'));
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
