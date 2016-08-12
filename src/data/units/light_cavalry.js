/**
 * Light cavalry unit
 *
 */
module.exports = {
    name: 'light_cavalry',
    verbose_name: 'Cavalier léger',
    building: 'barracks',
    required_level: 11,
    wood: 125,
    clay: 100,
    iron: 250,
    food: 4,
    build_time: 1800,
    attack: 130,
    type: 'cav',
    defense: {
        inf: 30,
        cav: 40,
        arc: 30
    },
    speed: 8,
    load: 80,
//    type: 2,
    points: {
        atk: 13,
        def: 5
    }
};
