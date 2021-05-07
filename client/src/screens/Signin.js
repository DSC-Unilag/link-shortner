import {useRef} from 'react'
import { useHistory } from "react-router-dom"

const Signin = () => {
  const history = useHistory()
  localStorage.getItem('token') && history.push('/dashboard')
  const email = useRef('')
  const password = useRef('')
  const handleClick = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      Signin Page
      <form action="">
        {/* Email */}
        <div>
          <label htmlFor="email">Email:  </label>
          <input type="email" ref={email} />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password:  </label>
          <input type="password" ref={password} />
        </div>

        {/* button */}
        <button onClick={handleClick}>Login</button>
      </form>
    </div>
  )
}

export default Signin
