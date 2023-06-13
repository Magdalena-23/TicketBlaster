import React from "react";
import FormWrapper from "../../common/FormWrapper";
import Input from "../../common/Input";
import classes from "./Register.module.css";
import { FormButton, LinkButton } from "../../common/FormButtons";

function Register() {
  return (
    <FormWrapper>
      <h1>Create Account</h1>
      <Input type="text" id="name" label="Full Name" />
      <Input type="email" id="email" label="Email" />
      <Input type="password" id="password" label="Password" />
      <Input type="password" id="confirm-password" label="Re-type Password" />
      <div className={classes.btn}>
        <FormButton text="Create Account" />
      </div>
      <LinkButton linkTo="/login" text="Already have an account?" />
    </FormWrapper>
  );
}

export default Register;
