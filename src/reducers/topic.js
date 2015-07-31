import {
  TOPIC_LOAD,
  TOPIC_LOAD_SUCCESS,
  TOPIC_LOAD_FAIL
} from '../actions/actionTypes';

const initialState = {};

const LOADING = Symbol("loading");
const ERROR = Symbol("error");

export default function topics(state = initialState, action = {}) {
  switch (action.type) {
    case TOPIC_LOAD:
      return {
        ...state,
        [action.slug]: LOADING
      };
    case TOPIC_LOAD_SUCCESS:
      return {
        ...state,
        [action.slug]: action.result
      };
    case TOPIC_LOAD_FAIL:
      return {
        ...state,
        [action.slug]: ERROR
      };
    default:
      return state;
  }
}

export function topicWasRequested(store, topicSlug) {
  var {topic} = store.getState();
  return topic && topic[topicSlug];
};
