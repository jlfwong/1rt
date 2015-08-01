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

const debug = (fn) => (...args) => {
  console.log("Arg:", ...args);
  const ret = fn(...args);
  console.log("Ret:", ret);
  return ret;
}

const uniqDataMergeByIds = (a, b) => ({
  topics: uniqBy(a.topics.concat(b.topics), "id"),
  videos: uniqBy(a.videos.concat(b.videos), "id")
})

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

    const _get = segments => {
      const [type, arg] = segments[segments.length - 1].split(":");

      return {
        video: (slug) => ({
          topics: [],
          videos: [videosBySlug[slug]]
        }),
        topic: (slug) => ({
          topics: [topicsBySlug[slug]],
          videos: []
        }),
        '*': () => {
          const parentData = _get(segments.slice(0, segments.length - 1));

          // Get data for all children of topics returned in the parent.
          const allChildren = parentData.topics.reduce((ret, topic) => {
            return ret.concat(topic.childData);
          }, []);

          return uniqDataMergeByIds(parentData, {
            topics: allChildren.filter(c => c.kind === "Topic")
                                  .map(c => topicsById[c.id]),
            videos: allChildren.filter(c => c.kind === "Video")
                                  .map(c => videosById[c.id])
          })
        }
      }[type](arg)
    }

    return _get(path.split("/"));
  },

  getDataForPaths(paths, allData) {
    return paths.reduce((ret, path) => (
      uniqDataMergeByIds(ret, TopicTree.getDataForPath(path, allData))
    ), {topics: [], videos: []})
  }
}

export default TopicTree;
