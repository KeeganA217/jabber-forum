import "./App.css";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/" exact component={HomeScreen} />
      <Route path="/profile" exact component={ProfileScreen} />
    </div>
  );
}

export default App;
