let globalModules = require('./modules.global');
let localModules = require('./modules.local');

module.exports = {
    modules: globalModules.concat(localModules),
    module_listener_options: {
        config_glob_paths: [
            'config/autoload/{,*.}{global,local}'
        ],
        module_paths: [
            './src',
            './module',
            '/Volumes/Repositories/private/uidriven/flow/'
        ],
        cache_dir: global.APPLICATION_ROOT + '/data/cache/application',
        config_cache_enabled: false,
        config_cache_key: 'module_config_cache',
        module_map_cache_enabled: false,
        module_map_cache_key: 'module_map_cache'
    },
    profiles: {
        cli: 'console',
        app: 'desktop',
        community: 'browser:protected',
        mobile: 'mobile'
    },
    view: {
        engine: 'twig'
    },
    data: {
        sources: {
            one: '',
            sentry: '',
            newrelic: '',
            logs: '',
            db: ''
        },
        types: {
            indent: ''
        },
        views: {
            
        }

    }
};