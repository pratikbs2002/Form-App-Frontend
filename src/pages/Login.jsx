import React, { useContext, useState } from "react";
import { login } from "../services/auth-service";
import "./Login.css";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router";
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
      alert("Wrong credentials");
    }
    if (res.status === 200) {
      alert("Login successfully");
      localStorage.setItem("username", loginData.username);
      localStorage.setItem("password", loginData.password);
      localStorage.setItem("auth", true);
      auth.setAuthData({ ...loginData });
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
      <div>Login Page</div>
      <form noValidate className="form">
        <div className="input-container">
          <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>

        <div className="input-container">
          <label>Password:</label>
          <input type="text" name="password" onChange={handleChange} />
        </div>

        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
