import video from './video';
import topic from './topic';
import topictree from './topictree';

const reducerMap = {
  video: video,
  topic: topic,
  [topictree.STORE_KEY]: topictree
}

export default reducerMap;
