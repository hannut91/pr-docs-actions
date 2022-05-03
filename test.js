const { execSync } = require('child_process');

const { createTempFolder } = require('./create-temp-folder');

// for test message
(async () => {
  const folder = await createTempFolder();
  execSync()
})();
