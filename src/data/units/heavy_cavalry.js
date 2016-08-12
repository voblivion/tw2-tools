/**
 * Heavy cavalry unit
 *
 */
module.exports = {
    name: 'heavy_cavalry',
    verbose_name: 'Cavalier lourd',
    building: 'barracks',
    required_level: 21,
    wood: 200,
    clay: 150,
    iron: 600,
    food: 6,
    build_time: 3200,
    attack: 150,
    type: 'cav',
    defense: {
        inf: 200,
        cav: 80,
        arc: 180
    },
    speed: 9,
    load: 50,
//    type: 2,
    points: {
        atk: 15,
        def: 23
    }
};
