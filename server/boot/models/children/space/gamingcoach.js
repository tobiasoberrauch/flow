Space.create({
    slug: 'gamingcoach',
    name: 'Gaming Coach',
    menu: [
        {
            label: 'Startseite',
            sref: 'app.dashboard'
        }
    ],
    models: [
        {
            "name": "Coach",
            "plural": "coaches",
            "base": "PersistedModel",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string",
                    "required": true
                },
                "age": {
                    "type": "string"
                },
                "experience": {
                    "type": "string"
                },
                "imageUrl": {
                    "type": "string"
                }
            },
            "validations": [],
            "relations": {},
            "acls": [
                {
                    "permission": "ALLOW",
                    "principalType": "ROLE",
                    "principalId": "$everyone",
                    "property": "myMethod"
                }
            ],
            "methods": []
        },
        {
            "name": "Coaching",
            "plural": "coachings",
            "base": "PersistedModel",
            "properties": {
                "id": {
                    "type": "string"
                },
                "title": {
                    "type": "string",
                    "required": true
                },
                "price": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "preferredTime": {
                    "type": "string"
                }
            },
            "validations": [],
            "relations": {
                "coach": {
                    "type": "hasOne",
                    "model": "Coach",
                    "foreignKey": "coachingId"
                },
                "location": {
                    "type": "hasOne",
                    "model": "Location",
                    "foreignKey": "coachingId"
                },
                "games": {
                    "type": "hasMany",
                    "model": "Game",
                    "foreignKey": "coachId"
                }
            },
            "acls": [
                {
                    "permission": "ALLOW",
                    "principalType": "ROLE",
                    "principalId": "$everyone",
                    "property": "myMethod"
                }
            ],
            "methods": []
        },
        {
            "name": "Location",
            "plural": "locations",
            "base": "PersistedModel",
            "properties": {
                "id": {
                    "type": "string"
                }
            },
            "validations": [],
            "relations": {},
            "acls": [],
            "methods": []
        },
        {
            "name": "Rating",
            "plural": "ratings",
            "base": "PersistedModel",
            "properties": {
                "id": {
                    "type": "string"
                }
            },
            "validations": [],
            "relations": {},
            "acls": [],
            "methods": []
        }
    ]
}, function (err, space) {
    require('./space-config')(app, config, space);
});