const { execSync } = require('child_process');

const { createTempFolder } = require('./create-temp-folder');

// comment1
(async () => {
  const folder = await createTempFolder();
  execSync()
})();
