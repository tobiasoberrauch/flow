import FlowModule from '../../src/Flow/FlowModule';

export default class Module extends FlowModule {
    get autoloaderConfig() {
        return {
            'Flow/Loader/ClassLoader': __dirname + '/src/Collector'
        };
    }

    get config() {
        return require(__dirname + '/config/module.config');
    }

    onBootstrap(mvcEvent) {
        let eventManager = mvcEvent.application.eventManager;
    }

    get bin() {
    }

    get version() {
    }

    get dependencies() {
    }

    get devDependencies() {
    }

    get scripts() {
        return {
            'start': 'babel-node bootstrap.js'
        };
    }
}