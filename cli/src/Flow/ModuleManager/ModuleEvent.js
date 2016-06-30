import Event from '../EventManager/Event';

export default class ModuleEvent extends Event {
    constructor() {
        super();

        this.arguments = new Map();
    }

    get moduleName() {
        return this.arguments.get('moduleName');
    }

    set moduleName(moduleName) {
        if (typeof moduleName !== 'string') {
            throw new InvalidArgumentException();
        }

        this.arguments.set('moduleName', moduleName);

        return this;
    }

    get module() {
        return this.arguments.get('module');
    }

    set module(module) {
        this.arguments.set('moduleName', module);

        return this;
    }


    get configListener() {
        return this.arguments.get('configListener');
    }

    set configListener(configListener) {
        this.setParam('configListener', configListener);
        this.arguments.set('configListener', configListener);

        return this;
    }
}