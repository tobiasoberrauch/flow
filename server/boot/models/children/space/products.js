Space.create({
    slug: 'products',
    name: 'Produkte',
    menu: [
        {
            label: 'Startseite',
            sref: 'app.dashboard'
        },
        {
            label: 'Shop',
            sref: 'app.dashboard',
            children: [
                {
                    label: 'Bestellungen',
                    sref: 'app.dashboard'
                },
                {
                    label: 'Rechnungen',
                    sref: 'app.dashboard'
                },
                {
                    label: 'Kunden',
                    sref: 'app.dashboard'
                },
                {
                    label: 'Produkte',
                    sref: 'app.dashboard'
                },
                {
                    label: 'Kollektionen',
                    sref: 'app.dashboard'
                },
                {
                    label: 'Geschenkkarten',
                    sref: 'app.dashboard'
                },
                {
                    label: 'Rabatte',
                    sref: 'app.dashboard'
                },
                {
                    label: 'Berichte',
                    sref: 'app.chart'
                }
            ]
        },
        {
            label: 'Website',
            sref: 'app.dashboard',
            children: [
                {
                    label: 'Blog',
                    sref: 'app.dashboard'
                },
                {
                    label: 'Seiten',
                    sref: 'app.dashboard'
                },
                {
                    label: 'Navigation',
                    sref: 'app.dashboard'
                },
                {
                    label: 'Themes',
                    sref: 'app.dashboard'
                }
            ]
        },
        {
            label: 'Config',
            sref: 'app.dashboard',
            children: [
                {
                    label: 'Apps',
                    sref: 'app.dashboard'
                },
                {
                    label: 'Settings',
                    sref: 'app.dashboard'
                }
            ]
        }
    ]
}, function (err, space) {
    require('./space-config')(app, config, space);
});