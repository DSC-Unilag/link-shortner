import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import NotFound from "./screens/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/register" component={Signup} />
        <Route
          exact
          path="/logout"
          component={() => {
            localStorage.clear();
            return <Redirect to="/" />;
          }}
        />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
