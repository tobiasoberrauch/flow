const loopback = require("loopback");
const boot = require("loopback-boot");
const explorer = require("loopback-component-explorer");
const app = loopback();
const bodyParser = require("body-parser");
const glob = require("glob");

app.use(bodyParser.urlencoded({
    extended: true
}));

var modelSources = glob.sync("../module/{community,core,grolba}/**/config/models", {
    cwd: __dirname
});

var models = {
    "_meta": {
        "sources": modelSources
    },
    "ACL": {
        "dataSource": "memory",
        "public": true
    }
};

modelSources.forEach(function (modelSource) {
    var modelFiles = glob.sync(modelSource + "/*.json", {
        cwd: __dirname
    });
    modelFiles.forEach(function (modelFile) {
        var modelConfigFile = require(modelFile);

        models[modelConfigFile.name] = {
            "dataSource": "memory",
            "public": true
        };
    });
});

boot(app, {
    appRootDir: __dirname,
    models: models,
    dataSources: {
        "memory": {
            "name": "memory",
            "connector": "memory"
        }
    },
    env: "development",
    config: {
        "legacyExplorer": false,
        "cors": false
    }
});
explorer(app, {
    basePath: "/api",
    mountPath: "/explorer"
});
app.use(loopback.token());
app.use("/api", loopback.rest());
app.use("/explorer", explorer.routes(app, {
    basePath: "/api"
}));
app.listen(function () {
    console.log("Awesome Web server listening at: %s", app.get("url"));
});


module.exports = app;