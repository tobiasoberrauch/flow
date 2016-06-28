module.exports = function (app) {
    var User = app.models.User;
    var Config = app.models.Config;

    User.create({
        "email": "to@gew.io",
        "password": "123"
    }, function (err, user) {
        Config.create({
            "customerId": user.id
        }, function (err, config) {
            require('./children/space')(app, config);
        });
    });
};