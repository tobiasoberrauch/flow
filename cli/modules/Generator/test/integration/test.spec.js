const fs = require('fs');
const PhpUnitGenerator = require('../../../Generator/src/Generator/PhpUnitGenerator');

describe('Runner', () => {
    it('PhpContainer', () => {
        let config = {
        };
        let phpUnitGenerator = new PhpUnitGenerator(config);

        phpUnitGenerator.generate('/Volumes/Repositories/production/b2c/casualFashion/module/Buying/src');
    });
});
