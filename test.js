const { execSync } = require('child_process');

const { createTempFolder } = require('./create-temp-folder');

// 주석입니다.
(async () => {
  const folder = await createTempFolder();
  execSync()
})();
