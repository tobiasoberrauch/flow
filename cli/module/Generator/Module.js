import FlowModule from "../../src/Flow/FlowModule";

export default class Module extends FlowModule {
    get autoLoaderConfig() {
        return {
            'Flow/Loader/ClassLoader': {
                'Collector': __dirname + '/src/Collector',
                'CollectorTest': __dirname + '/test/unit/CollectorTest'
            }
        };
    }

    get config() {
        return require(__dirname + '/config/module.config');
    }
}