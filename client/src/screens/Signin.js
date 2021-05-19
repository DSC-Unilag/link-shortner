import { useHistory } from "react-router-dom"
import { getToken } from "../utils/auth"
import Navbar from '../components/Navbar'
import { Flash } from "../components/Flash/flash"

const Signin = () => {
  const history = useHistory()
  localStorage.getItem('token') && history.push('/dashboard')
  const handleClick = async e => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value
    let user = await getToken({email, password})
    localStorage.setItem('token', user.data.token)
    localStorage.setItem('name', user.data.user.name)
    localStorage.setItem('email', user.data.user.email)
    setTimeout(() => {
      window.flash('Logged in successfully', 'success')
    }, 100)
    history.push('/dashboard')
  }

  return (
    <div>
      <Navbar />
      <Flash />
      Signin Page
      <form action="" onSubmit={handleClick}>
        {/* Email */}
        <div>
          <label htmlFor="email">Email:  </label>
          <input type="email" name="email" />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password:  </label>
          <input type="password" name="password" />
        </div>

        {/* button */}
        <button>Login</button>
      </form>
    </div>
  )
}

export default Signin
