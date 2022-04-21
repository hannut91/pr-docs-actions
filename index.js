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

// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }
