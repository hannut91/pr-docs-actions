/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 347:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const github = __nccwpck_require__(177);

const readTimelines = async ({
  githubToken,
  owner,
  repo,
  issueNumber,
}) => {
  const octokit = github.getOctokit(githubToken);
  const { data } = await octokit.rest.issues.listEventsForTimeline({
    owner,
    repo,
    issue_number: issueNumber,
  });

  return data;
};

module.exports = {
  readTimelines,
};


/***/ }),

/***/ 189:
/***/ ((module) => {

const createContent = (timelines) => timelines
  .reduce((acc, { message, body }) => {
    if (message) {
      return acc + `풀 리퀘스트 메시지: ${message}  \n`;
    }
    if (body) {
      return acc + `커멘트: ${body}  \n`;
    }

    return acc;
  }, '');

module.exports = {
  createContent
};


/***/ }),

/***/ 872:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { sep } = __nccwpck_require__(17);
const { tmpdir } = __nccwpck_require__(37);
const { mkdtemp } = __nccwpck_require__(292);

const createTempFolder = () => mkdtemp(`${tmpdir()}${sep}`);

module.exports = {
  createTempFolder
};


/***/ }),

/***/ 723:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { readFileSync } = __nccwpck_require__(147);

const core = __nccwpck_require__(450);
const github = __nccwpck_require__(177);

const readProperty = () => {
  const githubToken = core.getInput('githubToken');
  const personalToken = core.getInput('personalToken');

  const owner = github.context.payload.repository.owner.login;
  const repo = github.context.payload.repository.name;

  const wikiRepo = `https://${personalToken}@github.com/${process.env.GITHUB_REPOSITORY}.wiki.git`;
  const actor = process.env.GITHUB_ACTOR;

  const issueNumber = Number(readFileSync('./pr'));

  return {
    githubToken,
    owner,
    repo,
    issueNumber,
    wikiRepo,
    actor,
  }
};

module.exports = {
  readProperty
};


/***/ }),

/***/ 162:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { writeFile } = __nccwpck_require__(292);
const { execSync } = __nccwpck_require__(81);

const uploadContent = async ({ folder, content, issueNumber, wikiRepo, actor }) => {
  execSync(`git clone ${wikiRepo} ${folder}/pr-docs-actions.wiki`);

  execSync(`git config --global user.name "${actor}"`);
  execSync(`git config --global user.email "${actor}@users.noreply.github.com"`);

  await writeFile(`${folder}/pr-docs-actions.wiki/${issueNumber}.md`, content);

  execSync(`cd ${folder}/pr-docs-actions.wiki && git add . && git commit -m "test"`);
  execSync(`cd ${folder}/pr-docs-actions.wiki && git push`);
};

module.exports = {
  uploadContent
};


/***/ }),

/***/ 450:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 177:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 81:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 292:
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const { readProperty } = __nccwpck_require__(723);
const { readTimelines } = __nccwpck_require__(347);
const { createTempFolder } = __nccwpck_require__(872);
const { createContent } = __nccwpck_require__(189);
const { uploadContent } = __nccwpck_require__(162);

(async () => {
  const {
    githubToken,
    owner,
    repo,
    issueNumber,
    wikiRepo,
    actor,
  } = readProperty();

  const timelines = await readTimelines({
    githubToken,
    owner,
    repo,
    issueNumber,
  });

  const content = createContent(timelines);

  const folder = await createTempFolder();


  await uploadContent({ folder, content, issueNumber, wikiRepo, actor });
})();

})();

module.exports = __webpack_exports__;
/******/ })()
;