/**
 * Archer unit
 *
 */
module.exports = {
    name: 'archer',
    building: 'barracks',
    required_level: 9,
    wood: 80,
    clay: 30,
    iron: 60,
    food: 1,
    build_time: 1500,
    attack: 25,
    type: 'inf',
    defense: {
        inf: 10,
        cav: 30,
        arc: 60
    },
    speed: 14,
    load: 10,
//    type: 3,
    points: {
        atk: 2,
        def: 5
    }
};
