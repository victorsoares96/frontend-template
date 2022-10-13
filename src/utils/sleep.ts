/* eslint-disable no-promise-executor-return */
function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export default sleep;
