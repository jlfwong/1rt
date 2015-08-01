import {
  TOPICTREE_DATA_REQUEST,
  TOPICTREE_DATA_SUCCESS,
  TOPICTREE_DATA_FAILURE
} from '../actions/actionTypes';

import TopicTree from '../TopicTree';

const initialState = {};

export default function topictree(state = initialState, action = {}) {
  switch (action.type) {
    case TOPICTREE_DATA_SUCCESS:
      return TopicTree.mergeIndices(state, TopicTree.indexData(action.result))
    default:
      return state
  }
}
