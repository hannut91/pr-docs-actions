const { readProperty } = require('./metadata');
const { readTimelines } = require('./api/github');
const { createTempFolder } = require('./create-temp-folder');
const { createContent } = require('./content');
const { uploadContent } = require('./wiki');

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
