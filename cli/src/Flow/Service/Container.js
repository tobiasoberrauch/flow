const fs = require('fs');

class ServiceContainer {
    constructor(config) {
        this.services = this.loadServices();
        this.config = config;
    }

    static create(config) {
        return new ServiceContainer(config);
    }

    loadServices() {
        var servicePath = __dirname + '/service';
        let serviceFiles = fs.readdirSync(servicePath);
        let services = serviceFiles.map(function (serviceFile) {
            return require(servicePath + '/' + serviceFile);
        });

        return new Set(services);
    }

    create(service) {
        service.set('config', this.config);

        for (let collector of service.collectors) {
            service.addContent(collector.fileName, collector.collect());
        }

        return service;
    }

    findOne(id) {
        for (let service of this.services) {
            if (service.id == id) {
                return this.create(service);
            }
        }
    }

    findOneByIndicator(indicator) {
        for (let service of this.services) {
            if (service.indicator == indicator) {
                return this.create(service);
            }
        }
    }

    getIndicators() {
        return Array.from(this.services).map(function (service) {
            return service.indicator;
        });
    }

    collect(fileNames) {
        let indicator = new Set(this.getIndicators());

        return fileNames
            .filter(fileName => indicator.has(fileName))
            .map(fileName => this.findOneByIndicator(fileName))
            .reduce(function (services, service) {
                services[service.id] = service;
                return services;
            }, {});
    }
}

module.exports = ServiceContainer;