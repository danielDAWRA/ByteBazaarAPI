import * as authService from './auth.service.js';

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json('Email and password are required!');
    return;
  }

  const token = await authService.login({ email, password });
  if (!token) {
    res.status(400);
    res.json({ msg: 'Wrong Credidentials' });
    return;
  }
  res.json({ token });
}

export {
  // eslint-disable-next-line import/prefer-default-export
  login,
};
import * as authService from './auth.service.js';

function isValidEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^(?=.{1,254}$)(?=.{1,64}@.{1,255}$)[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?!-)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
  // regex validates emails according to RFC 5321 conforming to Google's standards for nodemailer
  return emailRegex.test(email);
}

async function register(req, res) {
  const { email, password, repeatedPassword } = req.body;
  if (!isValidEmail(email)) {
    res.status(400);
    res.json({ msg: 'Please enter a valid email address.' });
    return;
  }
  if (password !== repeatedPassword) {
    res.status(400);
    res.json({ msg: 'Both passwords must match.' });
    return;
  }
  const token = await authService.register({ newUser: req.body });
  res.json({ msg: 'We have just sent you a confirmation email—please check your inbox.', token });
}

async function validate(req, res) {
  const { emailToken } = req.params;
  const user = await authService.validate({ emailToken });
  res.json({ msg: `${user.firstName}, your account has been confirmed.` });
}

export {
  register,
  validate,
};
