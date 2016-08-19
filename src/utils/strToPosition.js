module.exports = function(str) {
    var p = str.match(/(?:(\d+)\s*\|\s*(\d+))/).slice(1);
    return {x: parseInt(p[0]), y: parseInt(p[1])};
};
