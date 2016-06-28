const faker = require('faker');

module.exports = function (app, portal) {
    var Page = app.models.Page;

    var properties = Page.definition.rawProperties;
    var propertyKeys = Object.keys(properties).filter(function (propertyKey) {
        return ['id'].indexOf(propertyKey) === -1;
    });

    function guessValue(propertyType) {
        switch (propertyType) {
            case 'string':
                return faker.lorem.sentence();
            case 'number':
                return faker.random.number();
            case 'boolean':
                return faker.random.boolean();
            case 'object':
                return faker.random.objectElement();
            case 'array':
                return faker.random.arrayElement();
            case 'date':
                return faker.date.future();
            case 'buffer':
                return '';
            case 'geopoint':
                return '';
        }
    }
    function createPage() {
        var page = {};
        for (var index in propertyKeys) {
            if (propertyKeys.hasOwnProperty(index)) {
                var propertyKey = propertyKeys[index];
                var property = properties[propertyKey];
                page[propertyKey] = guessValue(property.type);
            }
        }
        return page;
    }

    var issues = [];
    for (var i = 0; i < 50; i++) {
        var page = createPage();
        page.portalId = portal.id;
        issues.push(page);
    }

    Page.create(issues);
};