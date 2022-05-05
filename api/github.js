const github = require('@actions/github');

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
