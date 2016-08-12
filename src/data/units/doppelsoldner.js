/**
 * Doppelsoldner unit
 *
 */
module.exports = {
    name: 'doppelsoldner',
    verbose_name: 'Berzerker',
    building: 'preceptory',
    required_level: 1,
    wood: 1200,
    clay: 1200,
    iron: 2400,
    food: 6,
    build_time: 1800,
    attack: 300,
    type: 'inf',
    defense: {
        inf: 100,
        cav: 100,
        arc: 50
    },
    speed: 14,
    load: 10,
//    type: 1,
    points: {
        atk: 25,
        def: 10
    },
    special: true
};
