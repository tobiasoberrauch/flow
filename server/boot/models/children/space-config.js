module.exports = function (app, config, space, label) {
    var SpaceConfig = app.models.SpaceConfig;

    SpaceConfig.create({
        configId: config.id,
        spaceId: space.id,
        label: label
    }, function (err, spaceConfig) {

    });
};