import "./App.css";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TopicsScreen from "./screens/TopicsScreen";
import { Route } from "react-router-dom";
import SingleTopicScreen from "./screens/SingleTopicScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/" exact component={HomeScreen} />
      <Route path="/admin/userlist" exact component={UserListScreen} />
      <Route path="/admin/user/:id/edit" component={UserEditScreen} />
      <Route path="/profile" exact component={ProfileScreen} />
      <Route path="/topics" exact component={TopicsScreen} />
      <Route path="/topics/:id" exact component={SingleTopicScreen} />
    </div>
  );
}

export default App;
