import { useHistory } from "react-router-dom"

const Signin = () => {
  const history = useHistory()
  localStorage.getItem('token') && history.push('/dashboard')
  const handleClick = (e) => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value
  }

  return (
    <div>
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
