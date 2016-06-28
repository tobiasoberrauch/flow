const faker = require('faker');

module.exports = function (app) {
    var Issue = app.models.Issue;
    var IssueType = app.models.IssueType;

    var properties = Issue.definition.rawProperties;
    var propertyKeys = Object.keys(properties).filter(function (propertyKey) {
        return ['id'].indexOf(propertyKey) === -1;
    });

    function guessValue(property) {
        switch (property.type) {
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

    function createIssue(issueType) {
        var issue = {};
        for (var index in propertyKeys) {
            if (propertyKeys.hasOwnProperty(index)) {
                var propertyKey = propertyKeys[index];
                var property = properties[propertyKey];

                if (propertyKey === 'issueTypeId') {
                    issue[propertyKey] = issueType.id;
                } else {
                    issue[propertyKey] = guessValue(property);
                }
            }
        }
        return issue;
    }

    IssueType.create({
        name: 'Existenzgründung',
        fields: {
            name: {
                type: "string",
                description: "Name",
                required: "true"
            },
            start: {
                type: "string",
                description: "Startup!"
            }
        }
    }, function (err, issueType) {
        var issues = [];
        for (var i = 0; i < 5; i++) {
            issues.push(createIssue(issueType));
        }

        Issue.create(issues);
    });
};