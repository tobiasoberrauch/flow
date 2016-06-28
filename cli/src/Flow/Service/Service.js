class Service extends Map {
    constructor(config) {
        super();

        this.set('config', config);

        this.set('collectors', new Set());
        this.set('content', new Map());
    }

    get id() {
        return this.get('id');
    }

    get indicator() {
        return this.get('indicator');
    }

    get config() {
        return this.get('config');
    }

    get collectors() {
        return this.get('collectors');
    }

    addCollector(collector) {
        collector.config = this.config;

        this.collectors.add(collector);
    }
    addContent(key, content) {
        this.content.set(key, content);
    }
}

module.exports = Service;