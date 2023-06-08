const emailPattern = /\S+@\S+\.\S+/;

const registerValidation = (data) => {
  const { fullName, email, password, confirm_password } = data;

  if (email.trim().length === 0 || !emailPattern.test(email)) {
    return "Invalid email";
  }
  if (password.trim().length === 0 || password.trim().length < 6) {
    return "Password must be at least 6 characters";
  }
  if (password !== confirm_password) {
    return "Passwords do not match";
  }
  if (fullName.trim().length === 0) {
    return "Name required";
  }
  return null;
};

const loginValidation = (data) => {
  const { email, password } = data;

  if (email.trim().length === 0 || !emailPattern.test(email)) {
    return "Invalid email";
  }
  if (password.trim().length === 0 || password.trim().length < 6) {
    return "Wrong email or password";
  }
  return null;
};

const forgotPasswordValidation = (email) => {
  if (email.trim().length === 0 || !emailPattern.test(email)) {
    return "Invalid email";
  }
  return null;
};

const resetPasswordValidation = (data) => {
  const { newPassword, confirm_password } = data;

  if (newPassword.trim().length === 0 || newPassword.trim().length < 6) {
    return "Password must be at least 6 characters";
  }
  if (newPassword !== confirm_password) {
    return "Passwords do not match";
  }
  return null;
};

module.exports = {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
};
