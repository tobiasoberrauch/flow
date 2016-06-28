import ModuleEvent from "../../ModuleManager/ModuleEvent";

export default class ModuleManager {
    constructor(modules, eventManager) {
        this.arguments = new Map([
            ['modulesAreLoaded', false],
            ['modules', new Set(modules)],
            ['eventManager', eventManager],
            ['modiöeCache', new Map()]
        ]);
        this.moduleCache = new Map();
        this.loadFinished = 0;
    }

    get eventManager() {
        return this.arguments.get('eventManager');
    }

    get modules() {
        return this.arguments.get('modules');
    }

    get modulesLoaded() {
        return this.arguments.get('modulesAreLoaded');
    }

    get event() {
        return this.arguments.get('event');
    }

    set event(event) {
        this.arguments.set('event', event);
    }

    loadModule(module) {
        let moduleName = module.getName();

        if (this.moduleCache.has(moduleName)) {
            return this.moduleCache.get(moduleName);
        }

        let event = new ModuleEvent();
        event.moduleName = moduleName;

        this.loadFinished++;

        let result = this.eventManager.trigger(ModuleEvent.EVENT_LOAD_MODULE_RESOLVE, event, function (result) {
            return (result);
        });

        module = result.last();
        if (!module) {
            throw new RuntimeException();
        }

        event.module = module;

        this.moduleCache.set(moduleName, module);

        this.eventManager.trigger(ModuleEvent.EVENT_LOAD_MODULE, event);

        this.loadFinished++;

        return module;
    }

    loadModules() {
        if (this.modulesLoaded) {
            return this;
        }

        this.eventManager.trigger(ModuleEvent.EVENT_LOAD_MODULES, this.event);
        this.eventManager.trigger(ModuleEvent.EVENT_LOAD_MODULES_POST, this.event);

        return this;
    }

    onLoadModules() {
        if (this.modulesLoaded) {
            return this;
        }
        for (let module of this.modules) {
            this.loadModule(module);
        }

        this.modulesLoaded = true;
    }

    attachDefaultListeners() {
        this.eventManager.attach(ModuleEvent.EVENT_LOAD_MODULES, [this, 'onLoadModules']);
    }
}