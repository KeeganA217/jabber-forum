import {
  LIST_TOPICS_REQUEST,
  LIST_TOPICS_SUCCESS,
  LIST_TOPICS_FAIL,
  LIST_ALL_TOPICS_REQUEST,
  LIST_ALL_TOPICS_SUCCESS,
  LIST_ALL_TOPICS_FAIL,
  ADD_NEW_TOPIC_REQUEST,
  ADD_NEW_TOPIC_SUCCESS,
  ADD_NEW_TOPIC_FAIL,
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

export const listAllTopicsReducer = (state = { topics: [] }, action) => {
  switch (action.type) {
    case LIST_ALL_TOPICS_REQUEST:
      return { loading: true };
    case LIST_ALL_TOPICS_SUCCESS:
      return { loading: false, topics: action.payload };
    case LIST_ALL_TOPICS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createNewTopicReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_TOPIC_REQUEST:
      return { loading: true };
    case ADD_NEW_TOPIC_SUCCESS:
      return { loading: false, topics: action.payload };
    case ADD_NEW_TOPIC_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
