Space.create({
    slug: 'gymify',
    name: 'Gymify',
    menu: [
        {
            label: 'Startseite',
            sref: 'app.dashboard'
        },
        {
            label: 'Browse',
            sref: 'app.dashboard'
        },
        {
            label: 'Training',
            sref: 'app.dashboard'
        },
        {
            label: 'Ernährung',
            sref: 'app.dashboard'
        },
        {
            label: 'Videos',
            sref: 'app.dashboard'
        },
        {
            label: 'Gurus',
            sref: 'app.dashboard'
        }
    ]
}, function (err, space) {
    require('./space-config')(app, config, space);
});
