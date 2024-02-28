import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
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
    <div id="login-form">
      <h1>Login</h1>
          <form className='login_form_container' onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" name="email" onChange={handleChange} value={data.email} required className='input' data-testid="email"/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password}  required  className='input'/>
            {error && <div className='error_msg'>{error}</div>}
            <input type="submit" value="Submit" />

            

          </form>
          <div id="login-tap">
          <h2 className="forgot-password text-right"> Forgot <a href="/forgot-password">password?</a> </h2>
            <h2>Don't have an accoun?{" "} <Link to="/Signup">Signup</Link></h2>
            </div>
    </div>
  );
};

export default Login;
