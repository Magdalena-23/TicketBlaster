import React from "react";
import classes from "./ForgotPassword.module.css";
import FormWrapper from "../../common/FormWrapper";
import Input from "../../common/Input";
import { FormButton, LinkButton } from "../../common/FormButtons";

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
