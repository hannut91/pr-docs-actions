const { writeFile } = require('fs/promises');
const { execSync } = require('child_process');

const github = require('@actions/github');

const { readProperty } = require('./metadata');
const { createTempFolder } = require('./create-temp-folder');

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
  const octokit = github.getOctokit(githubToken);
  const { data } = await octokit.rest.issues.listEventsForTimeline({
    owner,
    repo,
    issue_number: issueNumber,
  });

  // createContent
  const content = data.reduce((acc, { message, body }) => {
    if (message) {
      return acc + `풀 리퀘스트 메시지: ${message}  \n`;
    }
    if (body) {
      return acc + `커멘트: ${body}  \n`;
    }

    return acc;
  }, '');

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
