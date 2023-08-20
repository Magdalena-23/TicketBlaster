const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: process.env.MAILGUN_DOMAIN,
});
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require("../../../../server/validation/validation");

const register = async (req, res) => {
  const validationError = registerValidation(req.body);
  if (validationError) {
    return res.status(400).send(validationError);
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(409).send("User already exists");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send({
      message: "Registration Successful! Welcome to TicketBlaster!",
      newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const validationError = loginValidation(req.body);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("User not found!");

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).send("Wrong password!");
    }

    const { _id } = user;

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    res
      .header("auth-token", token)
      .status(200)
      .send({ message: "Login Successful", user: { _id }, token });
  } catch (err) {
    console.log(err);
    res.status(500).send("ISE");
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const validationError = forgotPasswordValidation(email);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    let user = await User.findOne({ email });

    if (!user) return res.status(404).send("User not found!");

    // Generate a password reset token
    const passwordResetToken = jwt.sign(
      { email },
      process.env.RESET_PASSWORD_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Compose the email content:
    const resetPasswordURL = `http://localhost:3000/reset-password/${passwordResetToken}`;
    const emailData = {
      from: process.env.MAILGUN_EMAIL,
      to: email,
      subject: "Password Reset",
      html: `<p>Click the link to reset your password: <a href="${resetPasswordURL}">${resetPasswordURL}</a></p>`,
    };

    // Send the email using the Mailgun API:
    mailgun.messages().send(emailData, (error, body) => {
      if (error) {
        const { statusCode } = error;
        console.log("Error sending email:", error, statusCode);
        return res.status(statusCode).send(error);
      } else {
        console.log("Email sent successfully!");
        return res.status(200).send({ message: "Email has been sent!" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("ISE");
  }
};

const resetPassword = async (req, res) => {
  try {
    const validationError = resetPasswordValidation(req.body);
    if (validationError) {
      return res.status(400).send(validationError);
    }
    // Extract the reset token and new password
    const { newPassword, token } = req.body;

    // Verify the token
    jwt.verify(token, process.env.RESET_PASSWORD_KEY, (error, decoded) => {
      if (error) {
        console.log("Invalid or expired token:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      User.findOne({ email: decoded.email })
        .then((foundUser) => {
          if (foundUser) {
            // Update the user's password
            foundUser.password = bcrypt.hashSync(newPassword, 10);

            return foundUser.save();
          } else {
            return res.status(404).send("User not found");
          }
        })
        .then(() => {
          res
            .status(200)
            .json({ message: "Password has been successfully reset" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
