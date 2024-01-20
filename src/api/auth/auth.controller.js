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
