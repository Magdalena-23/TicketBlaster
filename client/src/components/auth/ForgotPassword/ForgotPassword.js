import React from "react";
import { Link } from "react-router-dom";
import classes from "./ForgotPassword.module.css";
import FormWrapper from "../../common/FormWrapper";
import Input from "../../common/Input";
import Button from "../../common/Button/Button";

function ForgotPassword() {
  return (
    <FormWrapper>
      <h1>Forgot Password</h1>
      <div className={classes.spacing}>
        <Input type="email" id="email" label="Email" />
        <Button type="form">Send password reset email</Button>
        <Link to="/login">
          <Button type="link">Back to login</Button>
        </Link>
      </div>
    </FormWrapper>
  );
}

export default ForgotPassword;
