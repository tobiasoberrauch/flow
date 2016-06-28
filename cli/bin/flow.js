#!/usr/bin/env node
const Liftoff = require('liftoff');
const argv = require('minimist')(process.argv.slice(2));

const Flow = new Liftoff({
    name: 'flow',
    moduleName: 'flow',
    configName: 'flowfile',
    processTitle: 'flow',
    extensions: require('interpret').jsVariants,
    v8flags: ['--harmony']
});
Flow.on('require', function (name) {
    console.log('Loading:', name);
});
Flow.on('requireFail', function (name, err) {
    console.log('Unable to load:', name, err);
});
Flow.on('respawn', function (flags, child) {
    console.log('Detected node flags:', flags);
    console.log('Respawned to PID:', child.pid);
});
Flow.on('init', function () {
    console.log('Requiring external module');
});

Flow.launch({
    cwd: argv.cwd,
    configPath: argv.flowfile,
    require: argv.require,
    completion: argv.completion,
    verbose: argv.verbose
}, start);

var tasks = argv._;
var toRun = tasks.length ? tasks : ['default'];

function start(env) {
    console.log(env.configPath);
    require(env.configPath);

    console.log(env.modulePath);
    var flow = require(env.modulePath);
    console.log(toRun);
    flow.start(toRun);
}


function debug(env) {
    if (argv.verbose) {
        console.log('LIFTOFF SETTINGS:', this);
        console.log('CLI OPTIONS:', argv);
        console.log('CWD:', env.cwd);
        console.log('LOCAL MODULES PRELOADED:', env.require);
        console.log('SEARCHING FOR:', env.configNameRegex);
        console.log('FOUND CONFIG AT:', env.configPath);
        console.log('CONFIG BASE DIR:', env.configBase);
        console.log('YOUR LOCAL MODULE IS LOCATED:', env.modulePath);
        console.log('LOCAL PACKAGE.JSON:', env.modulePackage);
        console.log('CLI PACKAGE.JSON', require('../package'));
    }

    if (process.cwd() !== env.cwd) {
        process.chdir(env.cwd);
        console.log('Working directory changed to', env.cwd);
    }

    if (!env.modulePath) {
        console.log('Local ', Flow.moduleName, ' module not found in: ', env.cwd);
        process.exit(1);
    }

    if (env.configPath) {
        require(env.configPath);
    } else {
        console.log('No ', Flow.configName, ' found.');
    }
}