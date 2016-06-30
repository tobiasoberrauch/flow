export default class Event {

    constructor(name = null, target = null, parameters = null) {
        this.arguments = new Map();

        if (name) {
            this.name = name;
        }
        if (target) {
            this.target = target;
        }
        if (parameters) {
            this.parameters = parameters;
        }
    }

    get name() {
        return this.arguments.get('name');
    }

    set name(name) {
        if (typeof name !== 'string') {
            throw new InvalidArgumentException();
        }

        this.arguments.set('name', name);

        return this;
    }

    get target() {
        return this.arguments.get('target');
    }

    set target(target) {
        this.arguments.set('target', target);

        return this;
    }

    get parameters() {
        if (!this.arguments.has('parameters')) {
            this.parameters = new Map();
        }

        return this.arguments.get('parameters');
    }

    set parameters(parameters) {
        this.arguments.set('parameters', parameters);

        return this;
    }


    setParameter(name, value) {
        this.parameters.set(name, value);

        return this;
    }

    getParameter(name, defaultValue = null) {
        return this.parameters.has(name) ? this.parameters.get(name) : defaultValue;
    }

    stopPropagation(stop = true) {
        this.arguments.set('stopPropagation', stop);

        return this;
    }

    propagationIsStopped() {
        return this.arguments.get('stopPropagation');
    }
}