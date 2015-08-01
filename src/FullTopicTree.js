import TopicTree from './TopicTree.js';

let raw;

if (__SERVER__) {
  // TODO(jlfwong): Make this actually download data from KA instead of just
  // pulling from disk.

  /*
  const PROJECTION = JSON.stringify({
      topics:[{
          id: 1,
          slug: 1,
          translatedTitle: 1,
          translatedDescription: 1,
          relativeUrl: 1,
          childData: 1
      }],
      videos: [{
          id: 1,
          slug: 1,
          translatedTitle: 1,
          translatedDescription: 1,
          translatedYoutubeId: 1
      }]
  });

  const TOPIC_TREE_URL = `https://www.khanacademy.org/api/v2/topics/topictree?projection=${PROJECTION}`;
  */

  raw = JSON.parse(require("fs").readFileSync(`${__dirname}/../static/topictree.json`));
} else {
  raw = {topics: [], videos: []}
}

export default TopicTree.indexData(raw);
