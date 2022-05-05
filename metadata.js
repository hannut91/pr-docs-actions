const { readFileSync } = require('fs');

const core = require('@actions/core');
const github = require('@actions/github');

const readProperty = () => {
  const githubToken = core.getInput('githubToken');
  const personalToken = core.getInput('personalToken');

  const owner = github.context.payload.repository.owner.login;
  const repo = github.context.payload.repository.name;

  const issueNumber = Number(readFileSync('./pr'));

  return {
    githubToken,
    personalToken,
    owner,
    repo,
    issueNumber,
  }
};

module.exports = {
  readProperty
};
