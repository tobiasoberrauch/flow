class Collector extends Map {
    get config() {
        return this.get('config');
    }

    set config(config) {
        this.set('config', config);
    }
}

module.exports = Collector;