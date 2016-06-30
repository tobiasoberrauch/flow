const vorpal = require('vorpal')();
const Docker = require('./src/Docker');

let docker = new Docker();
vorpal.command('run').action(docker.run);
vorpal.command('create [name]', 'Create redis instance').action(docker.create);
vorpal.command('ps').action(docker.ps);
vorpal.command('kill [name]').action(docker.kill);
vorpal.command('connect', 'Connects to redis').action(docker.connect);
vorpal.command('monitor').action(docker.monitor);

vorpal.delimiter('redis$').show();