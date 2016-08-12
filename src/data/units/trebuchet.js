/**
 * Trebuchet unit
 *
 */
module.exports = {
    name: 'trebuchet',
    verbose_name: 'Trébuchet',
    building: 'preceptory',
    required_level: 1,
    wood: 4000,
    clay: 2000,
    iron: 2000,
    food: 10,
    build_time: 1800,
    attack: 30,
    type: 'inf',
    defense: {
        inf: 200,
        cav: 250,
        arc: 200
    },
    speed: 50,
    load: 0,
//    type: 1,
    points: {
        atk: 0,
        def: 25
    },
    special: true
};
