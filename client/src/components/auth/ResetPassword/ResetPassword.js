import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./ResetPassword.module.css";
import FormWrapper from "../../common/FormWrapper";
import Input from "../../common/Input";
import Button from "../../common/Button/Button";
import axios from "../../../api/axios";
import Title from "../../common/Title/Title";

const RESET_URL = "/api/auth/reset-password";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
      const token = window.location.pathname.split("/").pop();
      await axios.post(
        RESET_URL,
        JSON.stringify({
          newPassword: password,
          confirm_password: confirmPassword,
          token,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response.status === 401) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Reset Password Failed. Try Again.");
      }
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>Reset Password</Title>
      {errorMsg && <span className={classes.error}>{errorMsg}</span>}
      <Input
        type="password"
        id="password"
        label="Password"
        onChange={handlePasswordChange}
        value={password}
        error={passwordError}
      />
      <Input
        type="password"
        id="confirm-password"
        label="Re-type password"
        onChange={handleConfirmPasswordChange}
        value={confirmPassword}
        error={confirmPasswordError}
      />
      <div className={classes.spacing}>
        <Button type="form">Reset Password</Button>
        <Link to="/login">
          <Button type="link">Back to login</Button>
        </Link>
      </div>
    </FormWrapper>
  );
}

export default ResetPassword;
