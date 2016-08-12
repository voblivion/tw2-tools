module.exports = function(time) {
    var p = time.split(':');
    return p[0] * 3600 + p[1] * 60 + p[2];
};
