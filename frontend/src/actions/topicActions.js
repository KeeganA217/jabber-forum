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

export const listTopics = () => async (dispatch) => {
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

// export const deleteTopic = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_DELETE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     await axios.delete(`/api/users/${id}`, config);

//     dispatch({ type: USER_DELETE_SUCCESS });
//   } catch (error) {
//     dispatch({
//       type: USER_DELETE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
