import { useHistory } from "react-router-dom";
import { getToken } from "../utils/auth";
import Navbar from "../components/Navbar";
import { useMediaQuery } from "react-responsive";
import { Flash } from "../components/Flash/flash"
    
const Signin = () => {
  const history = useHistory()
  if(localStorage.getItem('token')) {
    history.push('/dashboard')
    window.flash('You are logged in', 'warning')
  }
  
  const isDesktop = useMediaQuery({
    query: "(min-width: 760px)",
  });
  let formWidth = {};

  if (isDesktop) {
    formWidth = {
      width: "40%",
    };
  }
  const handleClick = async e => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value
    console.log(password)
    try {
      // let user = await getToken({email, password})
      // localStorage.setItem('token', user.data.token)
      // localStorage.setItem('name', user.data.user.name)
      // localStorage.setItem('email', user.data.user.email)
      // history.push('/dashboard')
      window.flash('Logged in successfully', 'success')
    } catch (error) {
      error.message = 'Request failed with status code 400' ? 
        window.flash('Invalid email or password', 'error') : 
        window.flash(error.message, 'error')
    }
  }

  return (
    <div>
      <Navbar />
      <Flash />

      <div className="form" style={formWidth}>
        <h3>SIGN IN</h3>

        <form action="" onSubmit={handleClick}>
          {/* Email */}
          <div>
            <label htmlFor="email"></label>
            <input type="email" name="email" placeholder="Email:" />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password"></label>
            <input type="password" name="password" placeholder="Password:" />
            <a className="forgot-password" href="">
              Forgot password?
            </a>
          </div>

          {/* button */}
          <div>
            <button className="green-btn">Sign in</button>
          </div>

          <p>
            You don't have an account?{" "}
            <a className="inline-signup" href="">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
