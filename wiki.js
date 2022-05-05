const { writeFile } = require('fs/promises');
const { execSync } = require('child_process');

const uploadContent = async ({ folder, content, issueNumber, wikiRepo, actor }) => {
  execSync(`git clone ${wikiRepo} ${folder}/pr-docs-actions.wiki`);

  execSync(`git config --global user.name "${actor}"`);
  execSync(`git config --global user.email "${actor}@users.noreply.github.com"`);

  await writeFile(`${folder}/pr-docs-actions.wiki/${issueNumber}.md`, content);

  execSync(`cd ${folder}/pr-docs-actions.wiki && git add . && git commit -m "test"`);
  execSync(`cd ${folder}/pr-docs-actions.wiki && git push`);
};

module.exports = {
  uploadContent
};
