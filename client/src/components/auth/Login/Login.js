import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import FormWrapper from "../../common/FormWrapper";
import Input from "../../common/Input";
import Button from "../../common/Button/Button";
import axios from "../../../api/axios";
import { useState } from "react";
import {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../../../validation/validation";
const LOGIN_URL = "api/auth/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateError = loginValidation(email, password);
    if (validateError) {
      console.log(validateError.emailMsg);
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
      localStorage.setItem("token", accessToken);
      // props.onLogIn();
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (
        err.response.status === 404 &&
        err.response.data.error === "Email not found"
      ) {
        setErrorMsg(err.response.data.error);
      } else if (
        err.response.status === 401 &&
        err.response.data.error === "Wrong email or password"
      ) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg("Login Failed");
      }
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h1>Log In</h1>
      <Input
        type="email"
        id="email"
        label="Email"
        value={email}
        onChange={handleEmailChange}
        className={errorMsg ? classes.invalid : classes.valid}
      />
      <Input
        type="password"
        id="password"
        label="Password"
        value={password}
        onChange={handlePasswordChange}
        className={errorMsg ? classes.invalid : classes.valid}
      />
      {errorMsg && <span className={classes.error}>{errorMsg}</span>}
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
