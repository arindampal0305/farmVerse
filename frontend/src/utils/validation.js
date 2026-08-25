// Email Validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Username Validation
export const validateUsername = (username) => {
  return username.trim().length >= 3;
};

// Password Validation
export const validatePassword = (password) => {
  /*
    Minimum 8 characters
    One uppercase
    One lowercase
    One number
    One special character
  */

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return regex.test(password);
};

// Confirm Password Validation
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};