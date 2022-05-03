const { writeFile } = require('fs/promises');
const { readFileSync } = require('fs');
const { execSync } = require('child_process');

const core = require('@actions/core');
const github = require('@actions/github');

const { createTempFolder } = require('./create-temp-folder');

const issueNumber = Number(readFileSync('./pr'));

(async () => {
  const myToken = core.getInput('myToken');
  const personalToken = core.getInput('personalToken');

  const owner = github.context.payload.repository.owner.login;
  const repo = github.context.payload.repository.name;
  // const issueNumber = github.context.payload.number;

  const octokit = github.getOctokit(myToken);
  const { data } = await octokit.rest.issues.listEventsForTimeline({
    owner,
    repo,
    issue_number: issueNumber,
  });
  const content = data.reduce((acc, { message, body }) => {
    if (message) {
      return acc + `풀 리퀘스트 메시지: ${message}  \n`;
    }
    if (body) {
      return acc + `커멘트: ${body}  \n`;
    }

    return acc;
  }, '');

  const folder = await createTempFolder();

  const wikiRepo = `https://${personalToken}@github.com/${process.env.GITHUB_REPOSITORY}.wiki.git`;
  execSync(`git clone ${wikiRepo} ${folder}/pr-docs-actions.wiki`);

  execSync(`git config --global user.name "${process.env.GITHUB_ACTOR}"`);
  execSync(`git config --global user.email "${process.env.GITHUB_ACTOR}@users.noreply.github.com"`);

  await writeFile(`${folder}/pr-docs-actions.wiki/${issueNumber}.md`, content);

  execSync(`cd ${folder}/pr-docs-actions.wiki && git add . && git commit -m "test"`);
  execSync(`cd ${folder}/pr-docs-actions.wiki && git push`);
})();
