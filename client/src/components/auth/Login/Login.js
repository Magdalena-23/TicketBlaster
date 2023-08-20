import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import FormWrapper from "../../common/FormWrapper/FormWrapper";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import axios from "../../../api/axios";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Title from "../../common/Title/Title";

const LOGIN_URL = "api/auth/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    setErrorMsg("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /\S+@\S+\.\S+/;

    if (email.trim().length === 0) {
      setEmailError("Email is required");
      return;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid email");
      return;
    } else if (password.trim().length === 0) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.token;
      login(accessToken);

      const redirectedFromItem = JSON.parse(
        localStorage.getItem("redirectedFromItem")
      );
      if (redirectedFromItem) {
        const { event, quantity } = redirectedFromItem;
        navigate(`/event-details/${event}`, { state: { quantity } });
        localStorage.removeItem("redirectedFromItem");
      } else {
        navigate("/tickets-history");
      }
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response.status === 404) {
        setEmailError(err.response.data);
      } else if (err.response.status === 400) {
        setPasswordError(err.response.data);
      } else {
        setErrorMsg("Login Failed");
      }
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>Log In</Title>
      {errorMsg && <span className={classes.error}>{errorMsg}</span>}
      <Input
        type="email"
        id="email"
        label="Email"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
      />
      <Input
        type="password"
        id="password"
        label="Password"
        value={password}
        onChange={handlePasswordChange}
        error={passwordError}
      />
      <div className={classes["form-actions"]}>
        <Link to="/forgot-password">
          <span>Forgot Password?</span>
        </Link>
        <Button className={classes.btn}>Log In</Button>
      </div>
      <Link to="/register">
        <Button type="link">Don’t have an account?</Button>
      </Link>
    </FormWrapper>
  );
};

export default Login;
