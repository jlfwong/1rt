import {
  VIDEO_LOAD,
  VIDEO_LOAD_SUCCESS,
  VIDEO_LOAD_FAIL
} from '../actions/actionTypes';

const initialState = {};

const LOADING = Symbol("loading");
const ERROR = Symbol("error");

export default function videos(state = initialState, action = {}) {
  switch (action.type) {
    case VIDEO_LOAD:
      return {
        ...state,
        [action.readableId]: LOADING
      };
    case VIDEO_LOAD_SUCCESS:
      return {
        ...state,
        [action.readableId]: action.result
      };
    case VIDEO_LOAD_FAIL:
      return {
        ...state,
        [action.readableId]: ERROR
      };
    default:
      return state;
  }
}

export function videoWasRequested(store, readableId) {
  var {video} = store.getState();
  return video && video[readableId];
};
