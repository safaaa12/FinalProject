import{ useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import "./styles.css";
import emailjs from "@emailjs/browser";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/users";
      const { data: res } = await axios.post(url, data);

      // send welcome email to user
      emailjs
        .send("service_061uyjc", "template_qejy7ja", {
          to_email: data.email,
        }, "Ac1RL4TgJZVZgpMSY")
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });

      navigate("/login");
      console.log(res.message);
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
    <div className='signup_container'>
      <div className="signup_form_container">
      
        <div className="right">
          <form className="signup_form_container" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
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
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className='input'
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
            {error && <div className='error_msg'>{error}</div>}
            <button type="submit" className='green_btn'>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;