const core = require('@actions/core');
const github = require('@actions/github');

const { createTempFolder } = require('./create-temp-folder');

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
  

  // 임시용 폴더 하나 만들고
  // 깃 환경설정
  // wiki.git pull 받고
  // 파일 만들고
  // 커밋하고
  // 푸시

  
})();
