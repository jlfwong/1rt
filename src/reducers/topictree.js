import {
  TOPICTREE_DATA_REQUEST,
  TOPICTREE_DATA_SUCCESS,
  TOPICTREE_DATA_FAILURE
} from '../actions/actionTypes';

import TopicTree from '../TopicTree';

// TODO(jlfwong): Move this initial state into TopicTree
const initialState = {videos: [], topics: []};

export const STORE_KEY = "__topictree__";

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOPICTREE_DATA_SUCCESS:
      return TopicTree.mergeRawData(state, action.result)
    default:
      return state
  }
}

const _get = (totalState) => (totalState[STORE_KEY] || initialState);

export const getTopicBySlug = (totalState, slug) =>
  TopicTree.getTopicBySlug(_get(totalState), slug);

export const getTopicById = (totalState, id) =>
  TopicTree.getTopicById(_get(totalState), id);

export const getVideoBySlug = (totalState, slug) =>
  TopicTree.getVideoBySlug(_get(totalState), slug);

export const getVideoById = (totalState, id) =>
  TopicTree.getVideoById(_get(totalState), id);

export const hasDataForPath = (totalState, path) =>
  TopicTree.hasDataForPath(path, TopicTree.indexData(_get(totalState)));
