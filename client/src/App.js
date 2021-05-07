import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  useHistory 
} from "react-router-dom"
import Navbar from './components/Navbar' 
import Home from './screens/Home'
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import Dashboard from './screens/Dashboard'
import NotFound from './screens/NotFound'

function App() {
  const history = useHistory()
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/logout" component={() => {
          localStorage.clear()
          history.push('/')
        }} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
