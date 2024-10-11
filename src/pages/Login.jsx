import React, { useContext, useState } from "react";
import { login } from "../services/auth-service";
import "./Login.css";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
export default function Login(props) {
  const { authenticated, setIsAuthenticated } = props;
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const auth = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(
      //   "_18725b7f_d600_482f_8e4c_ccc51f0d39a8_india_admin",
      //   "admin"
      loginData.username,
      loginData.password
    );
    if (res.status === 401) {
      toast.error("Wrong credentials", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
    }
    if (res.status === 200) {
      toast.success("Logged in successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
        pauseOnHover: false,
      });
      localStorage.setItem("username", loginData.username);
      localStorage.setItem("password", loginData.password);
      localStorage.setItem("auth", true);
      const data = await res.json();
      localStorage.setItem("role", data.role);
      auth.setAuthData({ ...loginData });
      console.log(data);

      setIsAuthenticated(true);
      navigate(`dashboard`);
    }
    console.log(res);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <div>
      <form noValidate className="form">
        <div className="login-header">Login</div>
        <div className="input-container">
          <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>

        <div className="input-container">
          <label>Password:</label>
          <input type="text" name="password" onChange={handleChange} />
        </div>

        <button className="login-button" type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
