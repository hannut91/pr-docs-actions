const { readFileSync } = require('fs');

const core = require('@actions/core');
const github = require('@actions/github');

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
