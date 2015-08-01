import {
  TOPICTREE_DATA_REQUEST,
  TOPICTREE_DATA_SUCCESS,
  TOPICTREE_DATA_FAILURE
} from './actionTypes';

function loadPaths(paths) {
  return {
    types: [
      TOPICTREE_DATA_REQUEST,
      TOPICTREE_DATA_SUCCESS,
      TOPICTREE_DATA_FAILURE
    ],
    promise: (client) => {
      return client.loadPaths(paths)
    },
    paths: paths
  }
}

import {hasDataForPath} from '../reducers/topictree';

export maybeLoadPath(store, path) {
  // TODO(jlfwong): Figure out if we *will* have the data for it to avoid
  // duplicate concurrent requests.
  if (!hasDataForPath(store.getState(), path)) {
    return store.dispatch(loadPaths([path]));
  }
}
