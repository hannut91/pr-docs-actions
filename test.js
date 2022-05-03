const { execSync } = require('child_process');

const { createTempFolder } = require('./create-temp-folder');

// comment2
(async () => {
  const folder = await createTempFolder();
  execSync()
})();
