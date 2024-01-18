import * as authService from './auth.service.js';
import transporter from '../nodemailer.js';

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
  const emailToken = await authService.register({ user: req.body });
  // eslint-disable-next-line prefer-template
  const url = 'http://localhost:3000/auth/validate/' + emailToken;
  await transporter.sendMail({
    to: email,
    subject: 'Confirm registration',
    html: `<h3>You're almost there!</h3><br><a href=${url}>Click this link to confirm your email address.</a>`,
  });
  res.json({ msg: 'We have just sent you a confirmation email—please check your inbox.' });
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
