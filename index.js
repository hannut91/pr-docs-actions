const { writeFile } = require('fs/promises');
const { execSync } = require('child_process');

const core = require('@actions/core');
const github = require('@actions/github');

const { createTempFolder } = require('./create-temp-folder');

(async () => {
  const myToken = core.getInput('myToken');
  const personalToken = core.getInput('personalToken');

  const owner = github.context.payload.repository.owner.login;
  const repo = github.context.payload.repository.name;
  const issueNumber = github.context.payload.number;

  const octokit = github.getOctokit(myToken);
  const { data } = await octokit.rest.issues.listEventsForTimeline({
    owner,
    repo,
    issue_number: issueNumber,
  });
  data.forEach(({ message, body }) => {
    if (message) {
      console.log('message: ', message);
    };
    if (body) {
      console.log('body: ', body);
    };
  });
  const folder = await createTempFolder();

  const wikiRepo = `https://${personalToken}@github.com/${process.env.GITHUB_REPOSITORY}.wiki.git`;
  execSync(`git clone ${wikiRepo} ${folder}/pr-docs-actions.wiki`);

  await writeFile(`${folder}/pr-docs-actions.wiki/${issueNumber}.md`, '안녕하세요');

  execSync(`cd ${folder}/pr-docs-actions.wiki && git add . && git commit -m "test"`);
  execSync(`cd ${folder}/pr-docs-actions.wiki && git push`);
})();
