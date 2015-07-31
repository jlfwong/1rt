import {
  VIDEO_LOAD,
  VIDEO_LOAD_SUCCESS,
  VIDEO_LOAD_FAIL
} from './actionTypes.js';

function loadVideo(readableId) {
  return {
    types: [VIDEO_LOAD, VIDEO_LOAD_SUCCESS, VIDEO_LOAD_FAIL],
    promise: (client) => {
      // TODO(jlfwong): Figure out how to use real API projections?
      return client
        .get(`api/v1/videos/${readableId}?casing=camel`)
        .then(data => ({
          title: data.translatedTitle,
          youtubeId: data.translatedYoutubeId,
          description: data.translatedDescription
        }))
    },
    readableId: readableId
  };
}

import {videoWasRequested} from '../reducers/video';

export function maybeLoadVideo(store, readableId) {
  if (!videoWasRequested(store, readableId)) {
    return store.dispatch(loadVideo(readableId));
  }
}
