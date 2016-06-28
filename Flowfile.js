const fs = require('fs');
const path = require('path');
const flow = require('flow');


flow.add('dev:di', ['fs:walk', function(walk) {
    console.log(walk);
}]);


flow.add('dev:config', function() {
    const validExtensions = ['.js', '.yml', '.json', '.xml'];
    const validFiles = ['.bowerrc', '.gitignore'];

    const walk = this.get('fs:walk');

    walk('frontend', function(err, files) {
        var configs = files.reduce(function(configs, filePath) {
            var fileExtension = path.extname(filePath);
            var fileName = path.basename(filePath, fileExtension).toLocaleLowerCase();

            if (validFiles.indexOf(filePath) > -1 || validExtensions.indexOf(fileExtension) > -1) {
                configs[fileName] = fs.readFileSync(filePath, {encoding: 'utf8'});
            }

            return configs;
        }, {});

        console.log(Object.keys(configs));
    });
});


flow.add('dev:json', function() {
    const yamlToJson = this.get('yaml:json');
    const yaml = fs.readFileSync('appspec.yml', 'utf-8');

    console.log(yaml);
    console.log(yamlToJson(yaml));
});
flow.add('dev:yaml', function() {
    const jsonToYaml = this.get('json:yaml');

    var json = {
        version: '2.0',
        services: {
            backend: {
                image: 'yavin/alpine-php-fpm:7.0',
                ports: [
                    "5000:5000"
                ],
                volumes: [
                    ".:/code"
                ],
                networks: [
                    'front-tier',
                    'back-tier'
                ]
            },
            phantom: {
                image: 'cmfatih/phantomjs'
            },
            redis: {
                image: 'redis',
                volumes: [
                    "redis-data:/var/lib/redis"
                ],
                networks: [
                    "back-tier"
                ]
            }
        },
        volumes: {
            'redis-data': {
                driver: 'local'
            }
        },
        networks: {
            'front-tier': {
                driver: 'bridge'
            },
            'back-tier': {
                driver: 'bridge'
            }
        }
    };

    console.log(jsonToYaml(json));
    return json;
});

flow.add('docker', function() {
    const docker = this.create('docker');

    console.log(docker);
});
flow.add('docker:containers', function() {
    const docker = this.create('docker');

    docker.listContainers(function(err, containers) {
        containers.forEach(function(containerInfo) {
            console.log(containerInfo);
            console.log(docker.getContainer(containerInfo.Id));
        });
    });
});
flow.add('docker:containers:create', ['docker'], function() {
    const docker = this.create('docker');

    docker.createContainer({
        Name: 'tobiasoberrauch/dev-profile',
        Image: 'yavin/alpine-php-fpm:7.0',
        Volumes: {
            "/Volumes/Repositories/production/b2c/casualFashion": {
                "HostVolume": "/app"
            }
        },
        PortBindings: {
            "9000": [
                {
                    "HostPort": "9000"
                }
            ]
        }
    }, function(err, container) {
        if (err) {
            return console.error(err);
        }

        console.log('createContainer', container);

        container.attach({stream: true, stdout: true, stderr: true}, function(err, stream) {
            stream.pipe(process.stdout);
        });


        container.start(function(err, data) {
            console.log('start', data);
        });
    });
});
flow.add('docker:containers:run', ['docker'], function() {
    const docker = this.create('docker');

    docker.run('tobiasoberrauch/dev-profile', ['bash', '-c', 'uname -a'], [process.stdout, process.stderr], {Tty: false}, function(err, data, container) {
        console.log('run', arguments)
    }).on('container', function(container) {
        console.log('run on container: ', container);

        container.defaultOptions.start.Binds = ["/tmp:/tmp:rw"];
    });
});


flow.add('docker:images', function() {
    const docker = this.create('docker');

    docker.listImages(function(err, images) {
        images.forEach(function(imageInfo) {
            console.log(imageInfo);
            console.log(docker.getImage(imageInfo.Id));
        });
    });
});
flow.add('docker:images:create', ['docker'], function() {
    const docker = this.create('docker');

    docker.createImage({
        fromImage: 'yavin/alpine-php-fpm:7.0'
    }, function(err, stream) {
        stream.pipe(process.stdout);
    });
});


flow.add('default', function() {
});