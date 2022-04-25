const { execSync } = require('child_process');

const { createTempFolder } = require('./create-temp-folder');

// test page
(async () => {
  const folder = await createTempFolder();
  execSync()
})();
