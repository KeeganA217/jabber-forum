import {
  LIST_TOPICS_FAIL,
  LIST_TOPICS_REQUEST,
  LIST_TOPICS_SUCCESS,
  LIST_ALL_TOPICS_FAIL,
  LIST_ALL_TOPICS_REQUEST,
  LIST_ALL_TOPICS_SUCCESS,
  ADD_NEW_TOPIC_REQUEST,
  ADD_NEW_TOPIC_SUCCESS,
  ADD_NEW_TOPIC_FAIL,
  SINGLE_TOPIC_FAIL,
  SINGLE_TOPIC_SUCCESS,
  SINGLE_TOPIC_REQUEST,
  TOPIC_DELETE_FAIL,
  TOPIC_DELETE_SUCCESS,
  TOPIC_DELETE_REQUEST,
} from "../constants/topicConstants";
import axios from "axios";

export const createNewTopic = (title, id) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_NEW_TOPIC_REQUEST,
    });

    const url = "http://localhost:5000";

    const { data } = await axios.post(`${url}/api/topics`, { title, id });

    dispatch({
      type: ADD_NEW_TOPIC_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_NEW_TOPIC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listNewTopics = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_TOPICS_REQUEST,
    });

    const url = "http://localhost:5000";

    const { data } = await axios.get(`${url}/api/topics/new`);

    dispatch({
      type: LIST_TOPICS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_TOPICS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAllTopics = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_ALL_TOPICS_REQUEST,
    });

    const url = "http://localhost:5000";

    const { data } = await axios.get(`${url}/api/topics/all`);

    dispatch({
      type: LIST_ALL_TOPICS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_ALL_TOPICS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopicDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SINGLE_TOPIC_REQUEST,
    });

    const { data } = await axios.get(`/api/topics/${id}`);

    dispatch({
      type: SINGLE_TOPIC_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_TOPIC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTopic = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TOPIC_DELETE_REQUEST,
    });

    await axios.delete(`/api/topics/${id}`);

    dispatch({ type: TOPIC_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: TOPIC_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
