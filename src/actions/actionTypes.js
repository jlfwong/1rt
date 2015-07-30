const makeConstants = (strs) => {
  const ret = {};
  strs.forEach(s => { ret[s] = s });
  return ret;
}

export default makeConstants([
  'VIDEO_LOAD',
  'VIDEO_LOAD_SUCCESS',
  'VIDEO_LOAD_FAIL',

  'TOPIC_LOAD',
  'TOPIC_LOAD_SUCCESS',
  'TOPIC_LOAD_FAIL'
]);
