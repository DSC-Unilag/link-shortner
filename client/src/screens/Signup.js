import { useHistory } from "react-router-dom"

const Signup = () => {
  const history = useHistory()
  localStorage.getItem('token') && history.push('/dashboard')
  const handleClick = (e) => {
    e.preventDefault()
    let name = e.target.name.value
    let email = e.target.email.value
    let password = e.target.password.value
  }
  return (
    <div>
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
