export const checkDataFormat = (email, password) => {

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  let res = {
    msg: '',
    email: false,
    password: false
  }

  if (!emailRegex.test(email)) {
    res.msg = 'Please enter a valid email';
    res.email = true;
    return res;
  }
  else if (!password.length) {
    res.msg = 'Please enter a password';
    res.password = true;
    return res;
  }
  else if (password.length < 8) {
    res.msg = 'Password should be at least 8 characters';
    res.password = true;
    return res;
  }
  else return res;
}