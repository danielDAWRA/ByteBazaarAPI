import * as authService from './auth.service.js';
// import transporter from '../../../nodemailer.js';

async function register(req, res) {
  const { username, password, repeatedPassword } = req.body;
  // the following code will need to be strengthened with a RegEx in testing.
  if (!username.includes('@') || !username.includes('.')) {
    res.status(400);
    res.json({ msg: 'Username must be a valid email address.' });
    return;
  }
  if (password !== repeatedPassword) {
    res.status(400);
    res.json({ msg: 'Both passwords must match.' });
    return;
  }
  const emailToken = await authService.register({ username, password });
  // eslint-disable-next-line prefer-template
  const url = 'http://localhost:3000/auth/confirm/' + emailToken;
  await transporter.sendMail({
    to: username,
    subject: 'Confirm registration',
    html: `<h3>You're almost there!</h3><br><a href=${url}>Click this link to confirm your email address.</a>`,
  });
  res.json({ msg: 'We have just sent you a confirmation email—please check your inbox.' });
}

async function confirm(req, res) {
  const { emailToken } = req.params;
  const user = await authService.confirm({ emailToken });
  res.json({ msg: `${user.username}, your account has been confirmed.` });
}

export {
  register,
  confirm,
};
