const createContent = (timelines) => timelines
  .reduce((acc, { message, body }) => {
    if (message) {
      return acc + `풀 리퀘스트 메시지: ${message}  \n`;
    }
    if (body) {
      return acc + `커멘트: ${body}  \n`;
    }

    return acc;
  }, '');

module.exports = {
  createContent
};
