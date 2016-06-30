export default class CallbackHandler {
    constructor(callback, metadata = new Map()) {
        this.metadata = metadata;

        this.registerCallback(callback);
    }

    registerCallback(callback) {
        this.callback = callback;
    }

    getCallback() {
        return this.callback;
    }

    call(...args) {
        let callback = this.getCallback();

        if (Array.isArray(callback)) {
            let instance = callback[0];
            let methodName = callback[1];

            return instance[methodName].apply(this, args);
        }
        
        return callback.call(this, args);
    }

    // __invoke(...args) {
    //     return this.call(args);
    // }
    
    getMetadata() {
        return this.metadata;
    }

    getMetadatum(name) {
        if (this.metadata.has(name)) {

            return this.metadata.get(name);
        }

        return null;
    }
}