let FileCollector = require('../collector/file');
let Service = require('./Service');

module.exports = function (config) {
    let composer = new Service(config);
    composer.set('id', 'composer');
    composer.set('indicator', 'composer.json');

    composer.addCollector(new FileCollector('composer.json'));

    return composer;
};