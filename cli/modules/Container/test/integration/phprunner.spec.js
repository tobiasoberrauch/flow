const fs = require('fs');
const PhpContainer = require('../../src/Container/PhpContainer');

describe('Runner', () => {
    it('PhpContainer', () => {
        let containerRunner = require('docker-run');
        
        let phpContainer = new PhpContainer(containerRunner);
        phpContainer.run('/Volumes/Repositories/production/b2c/casualFashion/config/modules.global.php');
    });
});
