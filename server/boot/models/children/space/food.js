Space.create({
    slug: 'food',
    name: 'Essen',
    menu: [
        {
            label: 'Startseite',
            sref: 'app.dashboard'
        }
    ]
}, function (err, space) {
    require('./space-config')(app, config, space);
});