export default class EventManager {
    constructor(identifiers = null) {
        this.arguments = new Map();
        this.identifiers = identifiers;
    }

    set identifiers(identifiers) {
        this.arguments.set('identifiers', identifiers);
    }

    attach(event, callback = null, priority = 1) {
        if (event instanceof ListenerAggregateInterface) {
            return this.attachAggregate(event, callback);
        }
    }

    set sharedManager(sharedManager) {
        this.arguments.set('sharedManager', sharedManager);

    }


    attachAggregate() {

    }
}