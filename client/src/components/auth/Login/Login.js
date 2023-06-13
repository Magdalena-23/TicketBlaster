import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import FormWrapper from "../../common/FormWrapper";
import Input from "../../common/Input";
import { LinkButton } from "../../common/FormButtons";

const Login = () => {
  return (
    <FormWrapper>
      <h1>Log In</h1>
      <Input type="email" id="email" label="Email" />
      <Input type="password" id="password" label="Password" />
      <div className={classes["form-actions"]}>
        <Link to="/forgot-password">
          <span>Forgot Password?</span>
        </Link>
        <button className={classes.btn}>Log In</button>
      </div>
      <LinkButton linkTo="/register" text="Don’t have an account?" />
    </FormWrapper>
  );
};

export default Login;
