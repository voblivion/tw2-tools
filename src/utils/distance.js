module.exports = function(o, t) {
    var oz = (o.y % 2 === 0) ? o.x - 0.5 : o.x + 0.5;
    var tz = (t.y % 2 === 0) ? t.x - 0.5 : t.x + 0.5;
    var d1 = Math.sqrt(Math.pow(oz - tz, 2) + 0.75 * Math.pow(o.y - t.y, 2));
    var d2 = Math.sqrt(Math.pow(o.x - t.x, 2) + 0.75 * Math.pow(o.y - t.y, 2));
    return (d1 + d2) / 2;
};
