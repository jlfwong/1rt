import video from './video';
import topic from './topic';
import * as topictree from './topictree';

const reducerMap = {
  video: video,
  topic: topic,
  [topictree.STORE_KEY]: topictree.reducer
}

export default reducerMap;
