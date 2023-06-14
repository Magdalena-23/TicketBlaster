import React from "react";
import { Link } from "react-router-dom";
import classes from "./ResetPassword.module.css";
import FormWrapper from "../../common/FormWrapper";
import Input from "../../common/Input";
import Button from "../../common/Button/Button";

function ResetPassword() {
  return (
    <FormWrapper>
      <h1>Reset Password</h1>
      <Input type="password" id="password" label="Password" />
      <Input type="password" id="confirm-password" label="Re-type password" />
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
