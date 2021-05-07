import { Link } from 'react-router-dom'

const NavbarComponent = (props) => {

  return (
    <nav>
      <header>
         Short link
      </header>
      <nav>
        <Link to="/">Home</Link>
          
        {!localStorage.getItem('token')  ? 
          <div>
            <Link to="/login">Sign in</Link>
            <Link to="/register">Register</Link>
          </div> : 
          <div>
            <Link to="/dashboard" >Dashboard</Link>
            <Link to="/logout" >Logout</Link>
          </div>
        }
      </nav>
    </nav>
  )
}

export default NavbarComponent