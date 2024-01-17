import * as authService from './auth.service.js';

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

export default login;
