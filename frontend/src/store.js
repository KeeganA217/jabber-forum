import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userListReducer,
  userCommentsReducer,
  userDeleteReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import {
  listRecentTopicsReducer,
  listAllTopicsReducer,
  topicDetailsReducer,
  createNewTopicReducer,
  topicDeleteReducer,
} from "./reducers/topicReducer";
import {
  listCommentsReducer,
  listAllCommentsReducer,
  createCommentReducer,
  deleteCommentReducer,
} from "./reducers/commentReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userComments: userCommentsReducer,
  listRecentTopics: listRecentTopicsReducer,
  getAllTopics: listAllTopicsReducer,
  topicDelete: topicDeleteReducer,
  makeNewTopic: createNewTopicReducer,
  topicDetails: topicDetailsReducer,
  listComments: listCommentsReducer,
  listAllComments: listAllCommentsReducer,
  createComment: createCommentReducer,
  deleteComment: deleteCommentReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
