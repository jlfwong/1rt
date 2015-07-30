import {
  VIDEO_LOAD,
  VIDEO_LOAD_SUCCESS,
  VIDEO_LOAD_FAIL
} from './actionTypes.js';

export function load(readableId) {
  return {
    types: [VIDEO_LOAD, VIDEO_LOAD_SUCCESS, VIDEO_LOAD_FAIL],
    promise: (client) => {
      return client
        .get(`api/v1/videos/${readableId}?casing=camel`)
        .then((data) => ({translatedYoutubeId: data.translatedYoutubeId}))
    },
    readableId: readableId
  }
}
