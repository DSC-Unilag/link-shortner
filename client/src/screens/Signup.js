import { useHistory } from "react-router-dom";
import { createUser, getToken } from "../utils/auth";
import Navbar from "../components/Navbar";
import { useMediaQuery } from "react-responsive";

const Signup = () => {
  const history = useHistory();
  localStorage.getItem("token") && history.push("/dashboard");
  const handleClick = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    await createUser({ name, email, password });
    let user = await getToken({ email, password });
    localStorage.setItem("token", user.data.token);
    localStorage.setItem("name", user.data.user.name);
    localStorage.setItem("email", user.data.user.email);
    history.push("/dashboard");
  };

  const isDesktop = useMediaQuery({
    query: "(min-width: 760px)",
  });
  let formWidth = {};

  if (isDesktop) {
    formWidth = {
      width: "40%",
    };
  }

  return (
    <div>
      <Navbar />
      <div className="form" style={formWidth}>
        <h3>REGISTER</h3>
        <form action="" onSubmit={handleClick}>
          {/* Name */}
          <div>
            <label htmlFor="name"></label>
            <input type="name" name="name" placeholder="Full Name:" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email"></label>
            <input type="email" name="email" placeholder="Email:" />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password"></label>
            <input type="password" name="password" placeholder="Password:" />
          </div>

          {/* button */}
          <button className="green-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
