const PROJECTION = JSON.stringify({
    topics:[{
        id: 1,
        slug: 1,
        translatedTitle: 1,
        translatedDescription: 1,
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

let _DATA = null;

const indexBy = (list, key) => {
  return list.reduce((ret, cur) => {
    ret[cur[key]] = cur;
    return ret;
  }, {})
}

const uniqBy = (list, key) => (
  list.reduce(({seen, ret}, cur) => ({
    seen: {
      ...seen,
      [cur[key]]: 1
    },
    ret: ret.concat(seen[cur[key]] ? [] : [cur])
  }), {seen: {}, ret: []}).ret
)


const TopicTree = {
  // TODO(jlfwong): Make this actually download data from KA instead of just
  // pulling from disk.
  refreshData() {
    if (__SERVER__) {
      const raw = JSON.parse(require("fs").readFileSync(`${__dirname}/../static/topictree.json`));
      _DATA = TopicTree.transformData(raw);
    }
  },

  transformData(raw) {
    return {
      videosBySlug: indexBy(raw.videos, "slug"),
      videosById: indexBy(raw.videos, "id"),
      topicsBySlug: indexBy(raw.topics, "slug"),
      topicsById: indexBy(raw.topics, "id")
    }
  },

  getDataForPath(path, allData) {
    if (!allData) {
      allData = _DATA;
    }
    const {videosBySlug, videosById, topicsBySlug, topicsById} = allData;
    const defaultReturn = {
      topics: [],
      videos: []
    }

    const _get = segments => {
      const [type, arg] = segments[segments.length - 1].split(":");

      return {
        video: (slug) => ({
          ...defaultReturn,
          videos: [videosBySlug[slug]]
        }),
        topic: (slug) => ({
          ...defaultReturn,
          topics: [topicsBySlug[slug]]
        }),
        '*': () => {
          const parentData = _get(segments.slice(0, segments.length - 1));

          // Get data for all children of topics returned in the parent.
          const allChildren = parentData.topics.reduce((ret, topic) => {
            return ret.concat(topic.childData);
          }, []);

          const childVideos = allChildren.filter(c => c.kind === "Video")
                                  .map(c => videosById[c.id]);
          const childTopics = allChildren.filter(c => c.kind === "Topic")
                                  .map(c => topicsById[c.id]);

          return {
            ...defaultReturn,
            // TODO(jlfwong): Uniquify
            videos: uniqBy(parentData.videos.concat(childVideos), "id"),
            topics: uniqBy(parentData.topics.concat(childTopics), "id")
          }
        }
      }[type](arg)
    }

    return _get(path.split("/"));
  }
}

export default TopicTree;
