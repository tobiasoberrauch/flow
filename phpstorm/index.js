const fs = require("fs");

const glob = require("glob");
const async = require("async");
const parseString = require("xml2js").parseString;

const rootPath = '/Volumes/Repositories/production/b2c/casualFashion/.idea';

class Project {
    constructor(rootPath) {
        this.files = null;
        this.components = new Map();
        this.rootPath = rootPath;
    }

    loadFiles(files) {
        let project = this;

        let configs = glob.sync(project.rootPath + files);

        if (null === project.files) {
            return new Promise((resolve, reject) => {
                async.map(configs, (configFile, callback) => {
                    let config = fs.readFileSync(configFile, 'utf-8');

                    parseString(config, callback);
                }, function (err, content) {
                    if (err) {
                        return reject(err);
                    }

                    project.files = content;

                    return resolve(content);
                });
            });
        }

        return Promise.resolve(project.files);
    }

    addComponents() {

    }

    addComponent() {

    }

    getComponents() {
        console.log('getComponent ', component);

        this.loadFiles('/*.{xml,iml}')
            .then((components) => {
                if (components.hasOwnProperty('project')) {
                    let project = components.project;

                    
                }
            })
            .catch((error) => {
                console.log('catch ', error);
            });
    }

    getComponent(component) {



    }
}


let project = new Project(rootPath);
project.getComponents();


// project.getComponent('RemoteMappingsManager');
// project.getComponent('PhpProjectServersManager');

