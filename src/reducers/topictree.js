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

export const getTopicBySlug = (totalState, topicSlug) =>
  TopicTree.getTopicBySlug(_get(totalState), topicSlug);

export const getTopicById = (totalState, topicSlug) =>
  TopicTree.getTopicById(_get(totalState), topicSlug);

export const getVideoBySlug = (totalState, topicSlug) =>
  TopicTree.getVideoBySlug(_get(totalState), topicSlug);

export const getVideoById = (totalState, topicSlug) =>
  TopicTree.getVideoById(_get(totalState), topicSlug);

export const hasDataForPath = (totalState, path) =>
  TopicTree.hasDataForPath(path, TopicTree.indexData(_get(totalState)));
