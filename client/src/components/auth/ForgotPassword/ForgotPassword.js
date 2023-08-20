import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./ForgotPassword.module.css";
import FormWrapper from "../../common/FormWrapper/FormWrapper";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import axios from "../../../api/axios";
import Title from "../../common/Title/Title";

const FORGOT_PASSWORD_URL = "api/auth/forgot-password";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    setErrorMsg("");
    setMsg("");
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
    }

    try {
      const response = await axios.post(
        FORGOT_PASSWORD_URL,
        JSON.stringify({ email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setMsg(
          "Email sent! Tap the link in that email to reset your password."
        );
      }
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response.status === 404) {
        setEmailError(err.response.data);
      } else {
        setErrorMsg("Failed. Try Again");
      }
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>Forgot Password</Title>
      {errorMsg && <span className={classes.error}>{errorMsg}</span>}
      {msg && <span className={classes.msg}>{msg}</span>}
      <div className={classes.spacing}>
        <Input
          type="email"
          id="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
        />
        <Button type="form">Send password reset email</Button>
        <Link to="/login">
          <Button type="link">Back to login</Button>
        </Link>
      </div>
    </FormWrapper>
  );
}

export default ForgotPassword;
