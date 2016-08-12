/**
 * Spear unit
 *
 */
module.exports = {
    name: 'spear',
    verbose_name: 'Lancier',
    building: 'barracks',
    required_level: 1,
    wood: 50,
    clay: 30,
    iron: 20,
    food: 1,
    build_time: 1200,
    attack: 25,
    type: 'inf',
    defense: {
        inf: 55,
        cav: 45,
        arc: 10
    },
    speed: 14,
    load: 25,
//    type: 1,
    points: {
        atk: 1,
        def: 4
    }
};
