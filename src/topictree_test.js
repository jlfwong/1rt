import {assert} from 'chai';
import TopicTree from './topictree';

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
});
