const { execSync } = require('child_process');

const { createTempFolder } = require('./create-temp-folder');

// comment
(async () => {
  const folder = await createTempFolder();
  execSync()
})();
