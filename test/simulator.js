var units = require('../bin/data/units');
var simulator = require('../bin/simulator');
var _ = require('lodash');

var data = {
    atk: {
        units: {
            arc: 0,
            axe: 50,
            catapult: 0,
            heavy_cavalry: 0,
            knight: 1,
            light_cavalry: 0,
            mercenary: 0,
            mounted_arc: 50,
            ram: 12,
            snob: 0,
            spear: 0,
            sword: 0,
            trebuchet: 0
        },
        moral: 1,
        luck: 0.1,
        chapel: 1
    },
    def: {
        units: {
            arc: 100,
            axe: 0,
            catapult: 17,
            heavy_cavalry: 0,
            knight: 0,
            light_cavalry: 0,
            mercenary: 0,
            mounted_arc: 0,
            ram: 0,
            snob: 0,
            spear: 0,
            sword: 0,
            trebuchet: 0
        },
        wall: 10,
        chapel: 1
    },
    night_bonus: false
};

var res = simulator.simulate(data);

console.log(' ', _.repeat(' ', 16), '+', '-------------', '+', '-------------', '+');
console.log(' ', _.repeat(' ', 16), '|', '    BEFORE   ', '|', '    AFTER    ', '|');
console.log(' ', _.repeat(' ', 16), '+', '-----', '+', '-----', '+', '-----', '+', '-----', '+');
console.log(' ', _.repeat(' ', 16), '|', ' ATK ', '|', ' DEF ', '|', ' ATK ', '|', ' DEF ', '|');
console.log('+', _.repeat('-', 16), '+', '-----', '+', '-----', '+', '-----', '+', '-----', '+');
_.forEach(_.keys(units), function(n) {
    var name = n + _.repeat(' ', 16 - n.length);

    var b = (Math.round(data.atk.units[n]) || ' ') + '';
    var btk = _.repeat(' ', 5 - b.length) + b;
    var a = (Math.round(res.atk.units[n]) || ' ') + '';
    if(a == ' ' && b != ' ') a = '0';
    var atk = _.repeat(' ', 5 - a.length) + a;

    var e = (Math.round(data.def.units[n]) || ' ') + '';
    var eef = _.repeat(' ', 5 - e.length) + e;
    var d = (Math.round(res.def.units[n]) || ' ') + '';
    if(d == ' ' && e != ' ') d = '0';
    var def = _.repeat(' ', 5 - d.length) + d;
    console.log('|', name, '|', btk, '|', eef, '|', atk, '|', def, '|');
});
console.log('+', _.repeat('-', 16), '+', '-----', '+', '-----', '+', '-----', '+', '-----', '+');
