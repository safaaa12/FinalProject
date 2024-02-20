import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  //new
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", res.data.isAdmin);
      localStorage.setItem("email", data.email);
      
      // Update success message state
      setSuccessMessage("Login successful!");
     window.location = "/";
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
    <div className='login_container'>
      <div className='login_form_container'>
        <div className='left'>
          <form className='login_form_container' onSubmit={handleSubmit}>
            <h1 style={{ color: '#3bb19b' }} >Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className='input'
              data-testid="email"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className='input'
            />

            <Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
              <p style={{ padding: "0 15px" }}>Forgot Password ?</p>
            </Link>

            {error && <div className='error_msg'>{error}</div>}
            <button type="submit" className='green_btn' data-testid="login-button">
              Sign In
            </button>
          </form>
        </div>
        <div className='right'>
          <h1>New Here ?</h1>
          <Link to="/Signup">
            <button type="button" className='white_btn'>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
