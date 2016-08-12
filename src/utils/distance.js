module.exports = function(origin, target) {
    var x1 = (origin.y % 2 === 0) ? origin.x - 1 : origin.x;
    var x2 = (target.y % 2 === 0) ? target.x - 1 : target.x;
    return Math.sqrt(Math.pow(x1 - x2, 2) + 0.75 * Math.pow(origin.y - target.y, 2));
};
