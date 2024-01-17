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

async function login({ username, password }) {
  const user = await usersRepository.getByUsername({ username });
  let token;

  if (user && compareSync(password, user.password)) {
    token = getToken(user._id);
  }

  return token;
}

export default login;
