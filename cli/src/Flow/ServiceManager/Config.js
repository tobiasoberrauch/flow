class Config {
    constructor(config) {
        this.config = config;
    }

    get allowOverride() {
        return this.config.has('allow_override') ? this.config.allow_override : null;
    }

    get factories() {
        return this.config.has('factories') ? this.config.get('factories') : new Map();
    }

    get abstractFactories() {
        return this.config.has('abstract_factories') ? this.config.get('abstract_factories') : new Set();
    }

    get invokables() {
        return this.config.has('invokables') ? this.config.get('invokables') : new Map();
    }

    get services() {
        return this.config.has('services') ? this.config.get('services') : new Map();
    }

    get aliases() {
        return this.config.has('aliases') ? this.config.get('aliases') : new Map();
    }

    get initializers() {
        return this.config.has('initializers') ? this.config.get('initializers') : new Map();
    }

    get shared() {
        return this.config.has('shared') ? this.config.get('shared') : new Map();
    }

    get delegators() {
        return this.config.has('delegators') ? this.config.get('delegators') : new Map();
    }

    configureServiceManager(serviceManager) {
        if (this.allowOverride !== null) {
            serviceManager.allowOverride(this.allowOverride);
        }

        for (let [name, factory] of this.factories.entries()) {
            serviceManager.setFactory(name, factory);
        }

        for (let factory of this.abstractFactories.values()) {
            serviceManager.addAbstractFactory(factory);
        }

        for (let [name, invokable] of this.invokables.entries()) {
            serviceManager.setInvokableClass(name, invokable);
        }

        for (let [name, service] of this.services.entries()) {
            serviceManager.setService(name, service);
        }

        for (let [name, nameOrAlias] of this.aliases.entries()) {
            serviceManager.setAlias(name, nameOrAlias);
        }

        for (let initializer of this.initializers.values()) {
            serviceManager.addInitializer(initializer);
        }

        for (let [name, isShared] of this.shared.entries()) {
            serviceManager.setShared(name, isShared);
        }

        for (let [originalServiceName, delegators] of this.delegators.entries()) {
            for (let delegator of delegators) {
                serviceManager.addDelegator(originalServiceName, delegator);
            }
        }
    }
}

module.exports = Config;