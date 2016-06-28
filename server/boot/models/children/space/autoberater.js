Space.create({
    slug: 'autoberater',
    name: 'Autoberater',
    menu: [
        {
            label: 'Startseite',
            sref: 'app.dashboard'
        }
    ]
}, function (err, space) {
    require('./space-config')(app, config, space);
});
