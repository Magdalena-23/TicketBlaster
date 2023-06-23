import React, { useEffect, useState } from "react";
import classes from "./UserDetails.module.css";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button/Button";
import axios from "../../api/axios";
import { decodeJwt } from "../../helpers/jwtDecode";

const UserDetails = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const userId = decodeJwt();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(`/api/users/${userId}`);
        setUser(user.data);
        setEmail(user.data.email);
        setFullName(user.data.fullName);
        console.log(user.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userId]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setFullNameError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    setConfirmPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
    setPasswordError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (password.trim().length < 6) {
      setPasswordError("Password too short");
      return;
    } else if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      return;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        `/api/users/${userId}`,
        { password },
        { headers: { "auth-token": token } }
      );
      console.log("User data updated:", response.data);
      // Handle success or display a success message
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setPasswordError("Password is required");
      return;
    } else if (password.trim().length < 6) {
      setPasswordError("Password too short");
      return;
    } else if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      return;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        `/api/users/${userId}`,
        { password },
        { headers: { "auth-token": token } }
      );
      console.log("User data updated:", response.data);
      // Handle success or display a success message
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <div className={classes["section"]}>
          <div className={`${classes["flex-column"]} ${classes.avatar}`}>
            <div className={classes["img-container"]}>
              <img
                src="https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg"
                alt="profile-avatar"
              />
            </div>
            <div className={classes["upload-wrapper"]}>
              <label
                htmlFor="avatar-upload"
                className={classes["upload-button"]}
              >
                Upload Avatar
              </label>
              <input
                type="file"
                id="avatar-upload"
                name="avatar-upload"
                accept="image/*"
              />
            </div>
          </div>
          <div className={classes["flex-column"]}>
            <Input
              style={classes.style}
              className={classes["name-email-inputs"]}
              type="text"
              label="Full Name"
              onChange={handleFullNameChange}
              value={fullName}
            />
            <Input
              style={classes.style}
              className={classes["name-email-inputs"]}
              type="email"
              label="Email"
              onChange={handleEmailChange}
              value={email}
            />
          </div>
        </div>
        <Button className={classes["submit-btn"]}>Submit</Button>
      </div>
      <div>
        <div className={classes.flex}>
          <h2>Password</h2>
          <Button
            className={classes.btn}
            onClick={() => setShouldShow((prevValue) => !prevValue)}
          >
            Change Password
          </Button>
        </div>
        {shouldShow && (
          <div className={classes["change-password-inputs"]}>
            <div className={classes.flex}>
              <Input
                style={classes.style}
                className={`${classes["password-input"]}`}
                type="password"
                label="Password"
                onChange={handlePasswordChange}
                value={password}
                error={passwordError}
              />
              <Input
                style={classes.style}
                className={classes["password-input"]}
                type="password"
                label="Re-type Password"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                error={confirmPasswordError}
              />
            </div>
            <Button
              className={classes["submit-btn"]}
              onClick={handlePasswordSubmit}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
