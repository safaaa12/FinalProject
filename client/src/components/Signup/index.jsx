import{ useState } from "react";
import axios from "axios";
import {Link } from "react-router-dom";
import "./styles.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3000/api/users";
			const { data: res } = await axios.post(url, data);
			setMsg(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
  return (
    <div id="login-form">
      <h1>Sign up</h1>
          <form className="signup_form_container" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className='input'
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className='input'
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className='input'
            />
            <input
              type="text"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className='input'
            />
            {error && <div className='error_msg'>{error}</div>}
            {msg && <div className='success_msg'>{msg}</div>}
            <input type="submit" value="Submit" />
          </form>
          <div id="login-tap">
            <h2>you have an account{" "} <Link to="/Login">Login</Link></h2>
            </div>
        </div>
  );
};

export default Signup;