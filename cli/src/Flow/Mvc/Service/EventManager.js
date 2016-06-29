import DefaultListenerAggregate from '../../ModuleManager/Listener/DefaultListenerAggregate';

export default class EventManager {
    constructor(identifiers = null) {
        this.arguments = new Map();
        this.identifiers = identifiers;
    }

    set identifiers(identifiers) {
        this.arguments.set('identifiers', identifiers);
    }

    set eventClass(eventClass) {
        this.arguments.set('eventClass', eventClass);
    }

    set sharedManager(sharedManager) {
        this.arguments.set('sharedManager', sharedManager);
    }

    get sharedManager() {
        let sharedManager = this.arguments.get('sharedManager');
        if (sharedManager instanceof SharedEventManager) {
            return sharedManager;
        }

        if (!StaticEventManager.hasInstance()) {
            return false;
        }

        sharedManager = StaticEventManager.getInstance();
        this.arguments.set('sharedManager', sharedManager);

        return sharedManager;
    }

    unsetSharedManager() {
        this.arguments.set('sharedManager', false);
    }

    attach(event, callback = null, priority = 1) {
        if (event instanceof DefaultListenerAggregate) {
            return this.attachAggregate(event, callback);
        }
    }

    attachAggregate() {
    }

    trigger() {
    }
}