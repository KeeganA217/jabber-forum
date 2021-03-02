import {
  LIST_COMMENTS_FAIL,
  LIST_COMMENTS_SUCCESS,
  LIST_COMMENTS_REQUEST,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_FAIL,
  NEW_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_FAIL,
  LIST_ALL_COMMENTS_FAIL,
  LIST_ALL_COMMENTS_REQUEST,
  LIST_ALL_COMMENTS_SUCCESS,
} from "../constants/commentConstants";
import axios from "axios";

export const listAllTopicComments = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_COMMENTS_REQUEST,
    });

    const url = "http://localhost:5000";

    const { data } = await axios.get(`${url}/api/comments/${id}`);

    dispatch({
      type: LIST_COMMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listComments = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_ALL_COMMENTS_REQUEST,
    });

    const url = "http://localhost:5000";

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
        isadmin: `${userInfo.isAdmin}`,
      },
    };

    const { data } = await axios.get(`${url}/api/comments`, config);

    dispatch({
      type: LIST_ALL_COMMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_ALL_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNewComment = (comment, topic_id, id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: NEW_COMMENT_REQUEST,
    });

    const url = "http://localhost:5000";

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${url}/api/comments`,
      {
        comment,
        topic_id,
        id,
      },
      config
    );

    dispatch({
      type: NEW_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeComment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_COMMENT_REQUEST,
    });

    const url = "http://localhost:5000";

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
        isadmin: `${userInfo.isAdmin}`,
      },
    };

    const { data } = await axios.delete(`${url}/api/comments/${id}`, config);

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
