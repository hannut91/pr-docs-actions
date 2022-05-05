const { readProperty } = require('./metadata');
const { readTimelines } = require('./api/github');
const { createTempFolder } = require('./create-temp-folder');
const { createContent } = require('./content');
const { uploadContent } = require('./wiki');

(async () => {
  const {
    githubToken,
    personalToken,
    owner,
    repo,
    issueNumber,
  } = readProperty();

  const timelines = await readTimelines({
    githubToken,
    owner,
    repo,
    issueNumber,
  });

  const content = createContent(timelines);

  const folder = await createTempFolder();

  const wikiRepo = `https://${personalToken}@github.com/${process.env.GITHUB_REPOSITORY}.wiki.git`;
  const actor = process.env.GITHUB_ACTOR;

  await uploadContent({ folder, content, issueNumber, wikiRepo, actor });
})();
