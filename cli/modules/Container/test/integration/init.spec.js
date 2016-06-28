const fs = require('fs');
const expect = require("chai").expect;
const ServiceContainer = require('../../src/Container/Container');

describe('.init', () => {
    it('finder', () => {
        let config = {
            rootPath: '/Volumes/Repositories/production/b2c/casualFashion'
        };
        let actualFiles = fs.readdirSync(config.rootPath);

        // let serviceContainer = ServiceContainer.create(config);
        // let actualResult = serviceContainer.collect(actualFiles);
        //
        // let expectedResult = {
        //     'composer': new Map()
        // };
        //
        // expect(actualResult).to.deep.equal(expectedResult);
    });
});