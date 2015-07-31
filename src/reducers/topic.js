import {
  TOPIC_LOAD,
  TOPIC_LOAD_SUCCESS,
  TOPIC_LOAD_FAIL
} from '../actions/actionTypes';

const initialState = {data: {}, status: {}}

const ERROR = Symbol("error");
const LOADED = Symbol("loaded");
const LOADING = Symbol("loading");

export default function topics(state = initialState, action = {}) {
  switch (action.type) {
    case TOPIC_LOAD:
      return {
        data: state.data,
        status: {
          ...state.status,
          [action.slug]: LOADING
        }
      }
    case TOPIC_LOAD_SUCCESS:
      return {
        data: {
          ...state.data,
          [action.slug]: action.result
        },
        status: {
          ...state.status,
          [action.slug]: LOADED
        }
      }
    case TOPIC_LOAD_FAIL:
      return {
        data: state.data,
        status: {
          ...state.status,
          [action.slug]: ERROR
        }
      }
    default:
      return state;
  }
}

const _get = (state) => (state.topic || initialState)

export function topicWasRequested(store, topicSlug) {
  return !!_get(store.getState()).status[topicSlug];
};

export function getTopic(state, topicSlug) {
  return _get(state).data[topicSlug];
}
