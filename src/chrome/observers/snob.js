var _ = require('lodash');
var $ = require('jquery');
var timeToSeconds = require('../../utils/timeToSeconds');
var strToPosition = require('../../utils/strToPosition');
var distance = require('../../utils/distance');
var slowestUnits = require('../../utils/slowestUnits');

module.exports = {
    element: '[ng-controller="OverviewIncomingController"] .win-main table tr',
    add: function(node) {
        /**
         * On est en présence d'une commande entrante
         */
        var td_target = $('.column-target_village_name', node);
        var td_origin = $('.column-origin_village_name', node);
        var td_progress = $('.column-command_progress', node);
        var td_type = $('.column-command_type', node);

        // Faire de la place pour l'icone
        td_progress.css({
            'line-height': '0',
            'text-align': 'inherit'
        });
        $('.progress-wrapper', td_progress).css({
            display: 'inline-block',
            width: 'calc(100% - 38px)'
        });

        // Calculer le temps total
        var progress_wrapper = $('.progress-wrapper', $(td_progress));
        var progress_bar = $('.progress-bar', $(td_progress));
        var progress = progress_bar.width() / progress_wrapper.width();
        var time = $('.progress-text', $(td_progress)).text();
        var seconds = timeToSeconds(time);
        var total = seconds / (1 - progress);

        // Calculer la distance origin/target
        var origin = strToPosition($('.coordinates', td_origin).text());
        var target = strToPosition($('.coordinates', td_target).text());
        var dist = distance(origin, target);

        // Afficher l'icone de l'unité la plus lente détectée
        var units = slowestUnits(total, dist);
        var unit = units[0];
        var name = unit.name;
        var verbose_name = unit.verbose_name;
        var icon = $('<span></span>');
        icon.addClass('tw2-tools icon-34x34-unit-' + name);
        icon.attr('title', verbose_name);
        icon.css({margin: '1px'});
        td_progress.append(icon);

        // Si l'unité la plus lente est un noble, alert
        var command_type = $('.type', td_type).attr('tooltip-content');
        if(_.includes(units, 'snob') && command_type === 'Attaque') {
            $('td', node).css({
                background: 'rgba(255, 0, 0, 0.5)',
                color: 'white'
            });
        }
        else if(_.includes(units, 'trebuchet') && command_type === 'Attaque') {
            $('td', node).css({
                background: 'rgba(200, 100, 0, 0.5)',
                color: 'white'
            });
        }
    }
};
