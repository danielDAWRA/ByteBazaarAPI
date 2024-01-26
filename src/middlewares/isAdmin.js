// eslint-disable-next-line consistent-return
const isAdmin = async (req, res, next) => {
  const admin = [true];
  if (!admin.includes(req.user.isAdmin)) {
    return res.status(403).send({
      message: 'You do not have permission.',
    });
  }
  next();
};
export default isAdmin;
