const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  const myToken = core.getInput('myToken');

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
})();
