module.exports = function (app) {
    var Goal = app.models.Goal;
    var KeyResult = app.models.KeyResult;

    Goal.create([
        {
            objective: 'Meetups organisieren'
        },
        {
            objective: 'Checkout 2.0'
        },
        {
            objective: 'Vision Board'
        },
        {
            objective: 'Entscheidungen'
        },
        {
            objective: 'Tracking & Improve'
        }
    ], function (err, goal) {
        if (!err) {
            KeyResult.create({
                title: '10 Verkäufe bis Ende Januar',
                goalId: goal.id,
                dueDate: new Date('2016-01-31'),
                measurements: [{
                    datetime: new Date('2015-12-12'),
                    value: 0
                }, {
                    datetime: new Date('2015-12-16'),
                    value: 1
                }, {
                    datetime: new Date(),
                    value: 2
                }],
                expectedValue: 10
            });
        }
    });

    Goal.create({
        objective: 'Entscheidungen'
    }, function (err, goal) {
        if (!err) {
            KeyResult.create({
                title: 'Übersetzungen',
                goalId: goal.id,
                dueDate: new Date('2016-01-31'),
                measurements: [{
                    datetime: new Date('2015-12-12'),
                    value: 0
                }, {
                    datetime: new Date('2015-12-16'),
                    value: 1
                }, {
                    datetime: new Date(),
                    value: 2
                }],
                expectedValue: 10
            });
        }
    });

    Goal.create({
        objective: 'Vision Board'
    }, function (err, goal) {
        if (!err) {
            KeyResult.create({
                title: 'Übersicht der verantwortlichen Personen',
                goalId: goal.id,
                dueDate: new Date('2016-01-31'),
                measurements: [{
                    datetime: new Date('2015-12-12'),
                    value: 0
                }, {
                    datetime: new Date('2015-12-16'),
                    value: 1
                }, {
                    datetime: new Date(),
                    value: 2
                }],
                expectedValue: 10
            });
        }
    });
};