// eslint-disable-next-line consistent-return
async function isAdmin(req, res, next) {
  const admin = true;
  if (req.user.isAdmin !== admin) {
    return res.status(403).send({
      message: 'You do not have permission.',
    });
  }
  next();
}

export default isAdmin;
