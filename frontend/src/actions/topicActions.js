import {
  LIST_TOPICS_FAIL,
  LIST_TOPICS_REQUEST,
  LIST_TOPICS_SUCCESS,
} from "../constants/topicConstants";
import axios from "axios";

// export const register = (first_name, last_name, email, password) => async (
//   dispatch
// ) => {
//   try {
//     dispatch({
//       type: USER_REGISTER_REQUEST,
//     });

//     const url = "http://localhost:5000";

//     const user = {
//       first_name,
//       last_name,
//       email,
//       password,
//     };

//     const { data } = await axios.post(`${url}/api/users/register`, user);

//     dispatch({
//       type: USER_REGISTER_SUCCESS,
//       payload: data,
//     });

//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: data,
//     });

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: USER_REGISTER_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const listTopics = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_TOPICS_REQUEST,
    });

    const url = "http://localhost:5000";

    const { data } = await axios.get(`${url}/api/topics`);

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
