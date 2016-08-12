/**
 * Knight unit
 *
 */
module.exports = {
    name: 'knight',
    verbose_name: 'Chevalier',
    building: 'statue',
    required_level: 1,
    wood: 0,
    clay: 0,
    iron: 0,
    food: 1,
    build_time: 21600,
    attack: 150,
    type: 'cav',
    defense: {
        inf: 250,
        cav: 400,
        arc: 150
    },
    speed: 8,
    load: 100,
//    type: 2,
    points: {
        atk: 20,
        def: 40
    }
};
