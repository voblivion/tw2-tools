module.exports = function(str) {
    var p = str.match(/(?:(\d+)\s\|\s(\d+))/).slice(1);
    return {x: p[0], y: p[1]};
};
