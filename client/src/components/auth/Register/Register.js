import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../../../api/axios";
import FormWrapper from "../../common/FormWrapper";
import Input from "../../common/Input";
import classes from "./Register.module.css";
import Button from "../../common/Button/Button";
const REGISTER_URL = "/api/auth/register";

function Register() {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const handleNameChange = (e) => {
    setFullName(e.target.value);
    setFullNameError("");
    setErrorMsg("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    setErrorMsg("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    setConfirmPasswordError("");
    setErrorMsg("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
    setPasswordError("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /\S+@\S+\.\S+/;
    if (!fullName) {
      setFullNameError("Name is required");
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid email");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    } else if (password.trim().length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    } else if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      return;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          fullName,
          email,
          password,
          confirm_password: confirmPassword,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      window.location.href = "/login";
      console.log(JSON.stringify(response.data));
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setEmailError("No Server Response");
      } else if (err.response.status === 409) {
        setEmailError(err.response.data);
      } else {
        setErrorMsg("Registration Failed");
      }
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      {errorMsg && <span className={classes.error}>{errorMsg}</span>}
      <Input
        type="text"
        id="fullName"
        label="Full Name"
        value={fullName}
        onChange={handleNameChange}
        error={fullNameError}
      />
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
      <Input
        type="password"
        id="confirm-password"
        label="Re-type Password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={confirmPasswordError}
      />
      <div className={classes.btn}>
        <Button type="form">Create account</Button>
      </div>
      <Link to="/login">
        <Button type="link">Already have an account?</Button>
      </Link>
    </FormWrapper>
  );
}

export default Register;
