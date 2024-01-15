import * as authService from './auth.service.js';

async function register(req, res) {
  const { username, password, repeatedPassword } = req.body;
  if (password !== repeatedPassword) {
    res.status(400);
    res.json({ msg: 'Both passwords should match!' });
    return;
  }
  const token = await authService.register({ username, password });
  res.json({ token });
}

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    res.json('Username and password are required!');
    return;
  }

  const token = await authService.login({ username, password });
  if (!token) {
    res.status(400);
    res.json({ msg: 'Wrong Credidentials' });
    return;
  }
  res.json({ token });
}

export {
  register,
  login,
};
