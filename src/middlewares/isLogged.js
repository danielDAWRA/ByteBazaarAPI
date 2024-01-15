import jwt from 'jsonwebtoken';
import * as userService from '../api/users/users.service.js';

function unauthorised(res) {
  res.status(401);
  res.json({ msg: 'Not authorised!' });
}

function isLogged(req, res, next) {
  const publicRoutes = [
    '/auth/login',
    '/auth/register',
  ];

  const isPublicRoute = publicRoutes.some((publicRoute) => req.url.startsWith(publicRoute));

  if (isPublicRoute) {
    next();
    return;
  }
  const token = req.headers.authorization;
  if (!token) {
    unauthorised(res);
    return;
  }
  const { TOKEN_SECRET_WORD } = process.env;
  jwt.verify(token, TOKEN_SECRET_WORD, async (error, payload) => {
    if (error) {
      console.error('jwt error');
      unauthorised(res);
      return;
    }

    const user = await userService.getById({ id: payload.userId });
    req.user = user;
    next();
  });
}

export default isLogged;
