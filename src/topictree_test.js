import {assert} from 'chai';
import TopicTree from './TopicTree';

const testData = {
  videos: [{
    id: "x1",
    slug: "a",
  }, {
    id: "x2",
    slug: "b"
  }],
  topics: [{
    id: "x3",
    slug: "c",
    childData: [{
      kind: "Topic",
      id: "x4"
    }, {
      kind: "Topic",
      id: "x5"
    }]
  }, {
    id: "x4",
    slug: "d",
    childData: [{
      kind: "Video",
      id: "x1"
    }, {
      kind: "Video",
      id: "x2"
    }]
  }, {
    id: "x5",
    slug: "e",
    childData: [{
      kind: "Video",
      id: "x2"
    }]
  }],
};

suite('TopicTree', () => {
  test('transformData', () => {
    const transformed = TopicTree.transformData(testData);
    assert.deepEqual(Object.keys(transformed.videosBySlug), ["a", "b"])
    assert.deepEqual(Object.keys(transformed.videosById), ["x1", "x2"])
    assert.deepEqual(Object.keys(transformed.topicsBySlug), ["c", "d", "e"])
    assert.deepEqual(Object.keys(transformed.topicsById), ["x3", "x4", "x5"])
  });

  suite('getDataForPath', () => {
    const transformed = TopicTree.transformData(testData);

    const assertDataForPath = (path, {topics, videos}) => {
      const data = TopicTree.getDataForPath(path, transformed);
      assert.deepEqual(data.topics.map(x => x.id), topics || []);
      assert.deepEqual(data.videos.map(x => x.id), videos || []);
    }

    test('video', () => {
      assertDataForPath("video:a", {videos: ["x1"]})
    })

    test('topic', () => {
      assertDataForPath("topic:c", {topics: ["x3"]})
    })

    test('topic wildcard 1', () => {
      assertDataForPath("topic:c/*", {topics: ["x3", "x4", "x5"]})
    })

    test('topic wildcard 2', () => {
      assertDataForPath("topic:d/*", {topics: ["x4"], videos: ["x1", "x2"]})
    })

    test('topic wildcard 3', () => {
      assertDataForPath("topic:e/*", {topics: ["x5"], videos: ["x2"]})
    })

    test('topic double wildcard', () => {
      assertDataForPath("topic:c/*/*", {topics: ["x3", "x4", "x5"],
                                        videos: ["x1", "x2"]})
    })
  });

  suite('getDataForPaths', () => {
    const transformed = TopicTree.transformData(testData);

    const assertDataForPaths = (paths, {topics, videos}) => {
      const data = TopicTree.getDataForPaths(paths, transformed);
      assert.deepEqual(data.topics.map(x => x.id), topics || []);
      assert.deepEqual(data.videos.map(x => x.id), videos || []);
    }

    test('videos', () => {
      assertDataForPaths(["video:a", "video:b"], {videos: ["x1", "x2"]})
    })

    test('topics', () => {
      assertDataForPaths(["topic:c", "topic:d"], {topics: ["x3", "x4"]})
    })
  })

  suite('hasDataForPath', () => {
    const allTransformed = TopicTree.transformData(testData);

    const assertHasDataForPath = (has, path, {topics, videos}) => {
      const transformedData = TopicTree.transformData({
        topics: topics.map(x => allTransformed.topicsById[x]),
        videos: videos.map(x => allTransformed.videosById[x])
      });
      assert.equal(has, TopicTree.hasDataForPath(path, transformedData));
    }

    test('videos', () => {
      assertHasDataForPath(false, "video:a", {videos: [], topics: []})
      assertHasDataForPath(false, "video:a", {
        videos: ["x2"],
        topics: []
      })
      assertHasDataForPath(true, "video:a", {
        videos: ["x1"],
        topics: []
      });
      assertHasDataForPath(true, "video:a", {
        videos: ["x1", "x2"],
        topics: []
      });
    });

    test('topics', () => {
      assertHasDataForPath(false, "topic:c", {videos: [], topics: []})
      assertHasDataForPath(true, "topic:c", {
        videos: [],
        topics: ["x3"]
      });
    });

    test('topic wildcard', () => {
      assertHasDataForPath(false, "topic:c/*", {videos: [], topics: []})
      assertHasDataForPath(false, "topic:c/*", {
        videos: [],
        topics: ["x3"]
      });
      assertHasDataForPath(true, "topic:c/*", {
        videos: [],
        topics: ["x3", "x4", "x5"]
      });
    });

    test('topic wildcard', () => {
      assertHasDataForPath(false, "topic:d/*", {videos: [], topics: []})
      assertHasDataForPath(true, "topic:d/*", {
        videos: ["x1", "x2"],
        topics: ["x4"]
      });
    });

    test('topic double wildcard', () => {
      assertHasDataForPath(false, "topic:c/*/*", {videos: [], topics: []})
      assertHasDataForPath(false, "topic:c/*/*", {
        videos: [],
        topics: ["x3"]
      });
      assertHasDataForPath(true, "topic:c/*/*", {
        videos: ["x1", "x2"],
        topics: ["x3", "x4", "x5"]
      });
    });
  });
});
