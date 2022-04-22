const { execSync } = require('child_process');

const { createTempFolder } = require('./create-temp-folder');

(async () => {
  const folder = await createTempFolder();
  execSync()
})();
