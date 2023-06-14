import React from "react";
import { Link } from "react-router-dom";
import FormWrapper from "../../common/FormWrapper";
import Input from "../../common/Input";
import classes from "./Register.module.css";
import Button from "../../common/Button/Button";

function Register() {
  return (
    <FormWrapper>
      <h1>Create Account</h1>
      <Input type="text" id="name" label="Full Name" />
      <Input type="email" id="email" label="Email" />
      <Input type="password" id="password" label="Password" />
      <Input type="password" id="confirm-password" label="Re-type Password" />
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
