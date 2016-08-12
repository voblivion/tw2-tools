var $ = require('jquery');
var _ = require('lodash');
var calculator = require('../../calculator');
var units = require('../../data/units');

setInterval(function() {
    var overview_incoming = $('[ng-controller="OverviewIncomingController"]');
    if(overview_incoming.length > 0) {
        var incoming_armies = $('.win-main table tr', overview_incoming);
        var progress_cols = $('.column-command_progress', incoming_armies);

        // Faire de la place pour un icone
        progress_cols.css({
            'line-height': '0',
            'text-align': 'inherit'
        });
        var progress_bars = $('.progress-wrapper', progress_cols);
        progress_bars.css({
            display: 'inline-block',
            width: 'calc(100% - 38px)'
        });

        progress_cols.each(function() {
            if($('.tw2-tools', $(this)).length === 0) {
                // Calculer le temps total
                var progress_wrapper = $('.progress-wrapper', $(this));
                var progress_bar = $('.progress-bar', $(this));
                var progress_percent = progress_bar.width() / progress_wrapper.width();
                var remaining_time_text = $('.progress-text', $(this)).text();
                var i = remaining_time_text.split(':');
                var remaining_time = i[0] * 3600 + i[1] * 60 + i[2];
                var total_time = remaining_time / (1 - progress_percent);
                console.log(remaining_time, total_time);

                // Calculer la distance
                var origin = $('.column-origin_village_name .coordinates').text();
                var origin_coords = origin.match(/(?:(\d+)\s\|\s(\d+))/).slice(1);
                origin = {x: origin_coords[0], y: origin_coords[1]};
                var target = $('.column-target_village_name .coordinates').text();
                var target_coords = target.match(/(?:(\d+)\s\|\s(\d+))/).slice(1);
                target = {x: target_coords[0], y: target_coords[1]};

                // Calcul de l'unité la plus lente
                var dist = calculator.distance(origin, target);
                var slowest_unit = null;
                var min_diff = Infinity;
                _.forEach(units, function(unit) {
                    var diff = Math.abs(unit.speed * dist * 60 * 100 - total_time);
                    if(diff < min_diff) {
                        slowest_unit = unit;
                        min_diff = diff;
                    }
                });

                // Affichage de l'icone de l'unité la plus lente
                var name = slowest_unit.name;
                var icon = $('<span class="tw2-tools icon-34x34-unit-'
                        + name + '"></span>');
                icon.css({
                    margin: '1px'
                });
                $(this).append(icon);

                // Sélection du type de commande entrante
                var type = $('.column-command_type .type').attr('tooltip-content');

                // Si l'unité la plus lente est un noble, surligner en rouge la ligne
                if(_.includes(['snob', 'trebuchet'], name) && type === 'Attaque') {
                    $('td', $(this).parent()).css({
                        background: 'rgba(255, 0, 0, 0.5)',
                        color: 'white'
                    });
                }
                // Si c'est une catapulte ou un bélier, surligner en orange la ligne
                else if(_.includes(['ram', 'catapult'], name) && type === 'Attaque') {
                    $('td', $(this).parent()).css({
                        background: 'rgba(200, 100, 0, 0.5)',
                        color: 'white'
                    });
                }
                console.log(type, name);
            }
        });
    }
}, 2000);
