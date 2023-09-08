const { GPUDetect } = require('../dist/cjs');
const assert = require('assert');

describe('REParse', () => {
    describe('Direct assignment', () => {
        it('Directly assign the captured match into result properties', () => { 
            const gpuInfo = GPUDetect.getGPU('AMD Radeon R9 M295X OpenGL Engine');
            assert.deepEqual(gpuInfo, { vendor: 'AMD', model: 'Radeon R9 M295X'});
        });
    });
});