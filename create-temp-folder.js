const { sep } = require('path');
const { tmpdir } = require('os');
const { mkdtemp } = require('fs/promises');

const createTempFolder = mkdtemp(`${tmpdir()}${sep}`);

module.exports = {
  createTempFolder  
};
