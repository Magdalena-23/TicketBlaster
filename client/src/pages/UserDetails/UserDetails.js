import React from "react";
import classes from "./UserDetails.module.css";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button/Button";

const UserDetails = () => {
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
            />
            <Input
              style={classes.style}
              className={classes["name-email-inputs"]}
              type="email"
              label="Email"
            />
          </div>
        </div>
        <Button className={classes["submit-btn"]}>Submit</Button>
      </div>
      <div>
        <div className={classes.flex}>
          <h2>Password</h2>
          <Button className={classes.btn}>Change Password</Button>
        </div>
        <div className={classes["change-password-inputs"]}>
          <div className={classes.flex}>
            <Input
              style={classes.style}
              className={classes["password-input"]}
              type="password"
              label="Password"
            />
            <Input
              style={classes.style}
              className={classes["password-input"]}
              type="password"
              label="Re-type Password"
            />
          </div>
          <Button className={classes["submit-btn"]}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
