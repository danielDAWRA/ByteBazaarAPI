import { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as usersRepository from '../users/users.repository.js';

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

async function register(user) {
  const { password } = user;
  const SALT_OR_ROUNDS_HASH = parseInt(process.env.SALT_OR_ROUNDS_HASH);
  const hashedPassword = hashSync(password, SALT_OR_ROUNDS_HASH);
  const newUser = user;
  newUser.password = hashedPassword;
  await usersRepository.register(newUser);
  const { EMAIL_TIMEOUT } = process.env;
  const token = getToken({ userId: newUser.email, timeout: EMAIL_TIMEOUT });
  return token;
}

async function confirm({ emailToken }) {
  const { TOKEN_SECRET_WORD } = process.env;
  const payload = jwt.verify(emailToken, TOKEN_SECRET_WORD);
  const user = await usersRepository.confirm({ email: payload.userId });
  return user;
}

export {
  register,
  confirm,
};
