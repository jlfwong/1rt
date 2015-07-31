import {
  TOPIC_LOAD,
  TOPIC_LOAD_SUCCESS,
  TOPIC_LOAD_FAIL,
} from './actionTypes.js';

// TODO(jlfwong): Support articles?
const SUPPORTED_KINDS = {
  "Video": 1
  "Topic": 1
};

export function load(slug) {
  return {
    types: [TOPIC_LOAD, TOPIC_LOAD_SUCCESS, TOPIC_LOAD_FAIL],
    promise: (client) => {
      return client
        .get(`api/v1/topic/${slug}?casing=camel`)
        .then(data => {
          return {
            title: data.translatedTitle,
            description: data.translatedDescription,
            relativeUrl: data.relativeUrl,
            children: data.children.map(child => {
              return {
                kind: child.kind,
                title: child.translatedTitle,
                description: child.translatedDescription,
                nodeSlug: child.nodeSlug
              };
            }).filter(child => SUPPORTED_KINDS[child.kind])
          };
        });
    },
    slug: slug
  };
}
