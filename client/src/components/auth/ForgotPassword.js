import React from "react";
import classes from "./ForgotPassword.module.css";
import FormWrapper from "../UI/FormWrapper";
import Input from "../UI/Input";
import { FormButton, LinkButton } from "../UI/FormButtons";

function ForgotPassword() {
  return (
    <FormWrapper>
      <h1>Forgot Password</h1>
      <div className={classes.spacing}>
        <Input type="email" id="email" label="Email" />
        <FormButton text="Send password reset email" />
        <LinkButton linkTo="/login" text="Back to login" />
      </div>
    </FormWrapper>
  );
}

export default ForgotPassword;
