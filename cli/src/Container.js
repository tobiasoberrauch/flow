const util = require('util');
const Orchestrator = require('orchestrator');

var Container = function () {
    Orchestrator.call(this);

    const yaml = require('yamljs');

    this.registry = {
        'docker': require('dockerode'),
        'docker:file': require('dockerfile-generator'),
        'yaml:json': yaml.parse,
        'json:yaml': yaml.stringify,
        'multiline': require('multiline'),
        'fs:glob': require('glob')
    };
};
util.inherits(Container, Orchestrator);

Container.prototype.has = function (name) {
    return this.registry.hasOwnProperty(name);
};
Container.prototype.get = function (name) {
    if (this.has(name)) {
        return this.registry[name];
    }
};
Container.prototype.create = function (name) {
    var Item = this.get(name);

    return new Item();
};

module.exports = Container;