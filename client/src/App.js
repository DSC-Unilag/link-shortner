import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  Redirect
} from "react-router-dom"
import Home from './screens/Home'
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import Dashboard from './screens/Dashboard'
import NotFound from './screens/NotFound'
import EventEmitter from 'events';

export const event = new EventEmitter();
function App() {
  window.flash = (message, type="success") => event.emit(
    'flash', 
    ({message, type})
  );
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/logout" component={() => {
          localStorage.clear();
          setTimeout(() => {
            window.flash('Signed out successfully', 'success')
          }, 100)
          return <Redirect to="/" />
        }} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
