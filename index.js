const { writeFile } = require('fs/promises');
const { execSync } = require('child_process');

const { readProperty } = require('./metadata');
const { readTimelines } = require('./api/github');
const { createTempFolder } = require('./create-temp-folder');
const { createContent } = require('./content');

// const {
//   githubToken,
//   personalToken,
//   owner,
//   repo,
//   issueNumber,
// } = readProperty();
// const timelines = readTimelines({
//   githubToken,
//   owner,
//   repo,
//   issueNumber,
// });
// const content = createContent(timelines);
// uploadContent(content);
(async () => {
  // readProperty
  const {
    githubToken,
    personalToken,
    owner,
    repo,
    issueNumber,
  } = readProperty();

  // readTimelines
  const timelines = await readTimelines({
    githubToken,
    owner,
    repo,
    issueNumber,
  });

  const content = createContent(timelines);

  // uploadContent
  const folder = await createTempFolder();

  const wikiRepo = `https://${personalToken}@github.com/${process.env.GITHUB_REPOSITORY}.wiki.git`;
  execSync(`git clone ${wikiRepo} ${folder}/pr-docs-actions.wiki`);

  execSync(`git config --global user.name "${process.env.GITHUB_ACTOR}"`);
  execSync(`git config --global user.email "${process.env.GITHUB_ACTOR}@users.noreply.github.com"`);

  await writeFile(`${folder}/pr-docs-actions.wiki/${issueNumber}.md`, content);

  execSync(`cd ${folder}/pr-docs-actions.wiki && git add . && git commit -m "test"`);
  execSync(`cd ${folder}/pr-docs-actions.wiki && git push`);
})();
