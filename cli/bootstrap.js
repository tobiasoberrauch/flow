const fs = require('fs');
const path = require('path');
const Application = require('./src/Application');

// const REQUEST_MICROTIME = new Date().getTime();
// const APPLICATION_ENV = 'dev';
global.APPLICATION_ROOT = __dirname;
global.import = function (className) {
    let factoryClassName = global.APPLICATION_ROOT + '/src/' + className;

    let module = require(factoryClassName);
    if (module.hasOwnProperty('default')) {
        module = module.default;
    }
    return module;
};


let configuration = require('./config/application.config');


Application.init(configuration).run();