import AbstractListener from "./AbstractListener";
import AutoLoaderListener from "./AutoloaderListener";
import InitTrigger from "./InitTrigger";
import LocatorRegistrationListener from "./LocatorRegistrationListener";
import OnBootstrapListener from "./OnBootstrapListener";
import ModuleDependencyCheckerListener from "./ModuleDependencyCheckerListener";
import ModuleLoaderListener from "./ModuleLoaderListener";
import ModuleResolverListener from "./ModuleResolverListener";

export default class DefaultListenerAggregate extends AbstractListener {
    constructor() {
        super();

        this.arguments = new Map([
            ['configListener', null]
        ]);
        this.listeners = new Set();
    }

    set configListener(configListener) {
        this.arguments.set('configListener', configListener);
    }

    get configListener() {
        return this.arguments.get('configListener');
    }

    /**
     *
     * @param events
     * @returns {DefaultListenerAggregate}
     */
    attach(events) {
        let options = this.options;
        let configListener = this.configListener;
        let locatorRegistrationListener = new LocatorRegistrationListener(options);

        this.listeners.add(events.attach(new ModuleLoaderListener(options)));
        this.listeners.add(events.attach(ModuleEvent.EVENT_LOAD_MODULE_RESOLVE, new ModuleResolverListener));
        this.listeners.add(events.attach(ModuleEvent.EVENT_LOAD_MODULE, new AutoLoaderListener(options), 9000));

        if (options.checkDependencies) {
            this.listeners.add(events.attach(ModuleEvent.EVENT_LOAD_MODULE, new ModuleDependencyCheckerListener, 8000));
        }

        this.listeners.add(events.attach(ModuleEvent.EVENT_LOAD_MODULE, new InitTrigger(options)));
        this.listeners.add(events.attach(ModuleEvent.EVENT_LOAD_MODULE, new OnBootstrapListener(options)));
        this.listeners.add(events.attach(locatorRegistrationListener));
        this.listeners.add(events.attach(configListener));

        return this;
    }

    detach(events) {

    }
}