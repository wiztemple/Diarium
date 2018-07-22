
export const validateUserDetails = (userDetails) => {
  const errorCode = 400;
  let errorMsg;
  const emailPattern = /[^\s]*@[a-z0-9.-]*/i;
  const nameFormat = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const {
    firstname,
    lastname,
    email,
    password,
  } = userDetails;

  if (!firstname || firstname.trim() === '' || (typeof firstname !== 'string')) {
    errorMsg = 'First name is required';
  }
  if (nameFormat.test(firstname)) {
    errorMsg = 'First name cannot contain special characters';
  }

  if (!lastname || lastname.trim() === '' || (typeof lastname !== 'string')) {
    errorMsg = 'Last name is required';
  }
  if (nameFormat.test(lastname)) {
    errorMsg = 'First name cannot contain special characters';
  }
  if (
    !email || email === undefined || email.toString().trim() === ''
  ) {
    errorMsg = 'email is required';
  }
  if (!emailPattern.test(email.trim())) {
    errorMsg = 'email is invalid';
  }
  if (!password || password.toString().trim() === '' || (typeof password !== 'string')) {
    errorMsg = 'password is required';
  }
  if (password.length < 6) {
    errorMsg = 'password length cannot be less than 6 characters';
  }

  return { errorCode, errorMsg };
};

export const isUserValid = (data) => {
  const { email, password } = data;
}
