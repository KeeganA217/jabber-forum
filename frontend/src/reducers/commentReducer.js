import {
  LIST_COMMENTS_FAIL,
  LIST_COMMENTS_SUCCESS,
  LIST_COMMENTS_REQUEST,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_SUCCESS,
  NEW_COMMENT_FAIL,
  NEW_COMMENT_RESET,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  LIST_ALL_COMMENTS_REQUEST,
  LIST_ALL_COMMENTS_SUCCESS,
  LIST_ALL_COMMENTS_FAIL,
} from "../constants/commentConstants";

export const listCommentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case LIST_COMMENTS_REQUEST:
      return { loading: true };
    case LIST_COMMENTS_SUCCESS:
      return { loading: false, comments: action.payload };
    case LIST_COMMENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listAllCommentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case LIST_ALL_COMMENTS_REQUEST:
      return { loading: true };
    case LIST_ALL_COMMENTS_SUCCESS:
      return { loading: false, comments: action.payload };
    case LIST_ALL_COMMENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_COMMENT_REQUEST:
      return { loading: true };
    case NEW_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case NEW_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case NEW_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { loading: true };
    case DELETE_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
