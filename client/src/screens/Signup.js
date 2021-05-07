import { useHistory } from "react-router-dom"
import { createUser, getToken } from "../utils/auth"
import Navbar from '../components/Navbar'

const Signup = () => {
  const history = useHistory()
  localStorage.getItem('token') && history.push('/dashboard')
  const handleClick = async e => {
    e.preventDefault()
    let name = e.target.name.value
    let email = e.target.email.value
    let password = e.target.password.value
    await createUser({name, email, password})
    let user = await getToken({email, password})
    localStorage.setItem('token', user.data.token)
    localStorage.setItem('name', user.data.user.name)
    localStorage.setItem('email', user.data.user.email)
    history.push('/dashboards')
  }
  return (
    <div>
      <Navbar />
      Signup Page
      <form action="" onSubmit={handleClick}>
        {/* Name */}
        <div>
          <label htmlFor="name">Full Name:  </label>
          <input type="name" name="name" />
        </div>

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
        <button>Register</button>
      </form>
    </div>
  )
}

export default Signup
