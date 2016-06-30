const Redis = require('ioredis');
const events = require('events');
const EventEmitter = events.EventEmitter;
const spawn = require('cross-spawn');
const freeport = require('freeport');
const util = require('util');


function generateName(text = '') {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


function Docker() {
    EventEmitter.call(this);

    this.containers = {};
}
util.inherits(Docker, EventEmitter);

Docker.prototype.run = function (args, callback) {

};

Docker.prototype.create = function (args, callback) {
    let docker = this;

    freeport(function (err, port) {
        let name = args.name ? args.name : generateName('redis-');

        spawn.sync('docker', ['stop', name], {stdio: 'inherit'});
        spawn.sync('docker', ['rm', name], {stdio: 'inherit'});
        spawn.sync('docker', ['run', '--name', name, '-p', port + ':6379', '-d', 'redis', 'redis-server'], {stdio: 'inherit'});

        let result = spawn.sync('docker', ['ps', '-l', '-q'], { stdio: 'inherit' });
        let containerId = result.output;
        let container = {
            id: containerId,
            name: name,
            host: 'localhost',
            port: port
        };
        console.log(container);

        docker.containers[containerId] = container;

        callback();
    });
};

Docker.prototype.ps = function (args, callback) {
    spawn.sync('docker', ['ps', '-a'], {stdio: 'inherit'});

    callback();
};

Docker.prototype.kill = function (args, callback) {
    if (args.name) {
        spawn.sync('docker', ['stop', args.name], {stdio: 'inherit'});
        spawn.sync('docker', ['rm', args.name], {stdio: 'inherit'});
    }

    callback();
};

Docker.prototype.connect = function (args, callback) {
    if (args.name && this.containers.hasOwnProperty(args.name)) {
        let container = this.containers[args.name];

        var redis = new Redis({
            port: container.port,
            showFriendlyErrorStack: true
        });
        this.containers[args.name].client = redis;

        redis.on('connect', function () {
            console.log('connected to ' + args.name, arguments);

            callback();
        });
        redis.on('error', function () {
            console.log('error in ' + args.name, arguments);

            callback();
        });
    }
};

Docker.prototype.monitor = function (args, callback) {

    if (args.name && this.containers.hasOwnProperty(args.name)) {
        let container = this.containers[args.name];
        if (container.hasOwnProperty('client')) {
            let redis = container.client;

            redis.monitor(function (err, monitor) {
                monitor.on('monitor', function (time, args, source, database) {
                    console.log('monitor', arguments);

                    callback();
                });
            });
        }
    }
};

module.exports = Docker;