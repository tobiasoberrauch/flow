const glob = require('glob');

module.exports = function (app) {
    glob('server/**/models/*.js', function (err, files) {
        files.forEach(function(file) {
            require(__dirname + '/../../' + file)(app);
        });
    });
};
