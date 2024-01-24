import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as usersRepository from '../users/users.repository.js';

function getToken(userId) {
  const payload = {
    userId,
  };

  const { TOKEN_SECRET_WORD, TOKEN_TIMEOUT } = process.env;
  const options = {
    expiresIn: TOKEN_TIMEOUT, // 1h
  };

  const token = jwt.sign(payload, TOKEN_SECRET_WORD, options);
  return token;
}

async function login({ email, password }) {
  const user = await usersRepository.getByEmail({ email });
  let token;

  if (user && compareSync(password, user.password)) {
    token = getToken(user._id);
  }

  return token;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  login,
};
import { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as usersRepository from '../users/users.repository.js';
import transporter from '../nodemailer.js';

function getToken({ userId, timeout }) {
  const payload = {
    userId,
  };
  const { TOKEN_SECRET_WORD } = process.env;
  const options = {
    expiresIn: timeout,
  };
  const token = jwt.sign(payload, TOKEN_SECRET_WORD, options);
  return token;
}

async function sendEmail({ email }) {
  const { EMAIL_TIMEOUT } = process.env;
  const emailToken = getToken({ userId: email, timeout: EMAIL_TIMEOUT });
  const validatePath = 'http://localhost:3000/auth/validate/';
  const url = validatePath + emailToken;
  await transporter.sendMail({
    to: email,
    subject: 'Confirm registration',
    html: `<h3>You're almost there!</h3><br><a href=${url}>Click this link to confirm your email address.</a>`,
  });
}

async function register({ newUser }) {
  const { password } = newUser;
  const intSaltOrRoundsHash = parseInt(process.env.SALT_OR_ROUNDS_HASH);
  const hashedPassword = hashSync(password, intSaltOrRoundsHash);
  const user = newUser;
  user.password = hashedPassword;
  const createdUser = await usersRepository.register({ user });
  await sendEmail({ email: user.email });
  const { TOKEN_TIMEOUT } = process.env;
  const token = getToken({ userId: createdUser._id, timeout: TOKEN_TIMEOUT });
  return token;
}

async function validate({ emailToken }) {
  const { TOKEN_SECRET_WORD } = process.env;
  const payload = jwt.verify(emailToken, TOKEN_SECRET_WORD);
  const user = await usersRepository.validate({ email: payload.userId });
  return user;
}

export {
  register,
  validate,
};
