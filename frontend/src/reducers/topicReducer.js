import {
  LIST_TOPICS_REQUEST,
  LIST_TOPICS_SUCCESS,
  LIST_TOPICS_FAIL,
} from "../constants/topicConstants";

export const listRecentTopicsReducer = (state = { topics: [] }, action) => {
  switch (action.type) {
    case LIST_TOPICS_REQUEST:
      return { loading: true };
    case LIST_TOPICS_SUCCESS:
      return { loading: false, topics: action.payload };
    case LIST_TOPICS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
