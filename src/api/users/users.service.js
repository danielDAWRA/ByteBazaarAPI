import { hashSync } from 'bcrypt';
import * as usersRepository from './users.repository.js';
import transporter from '../nodemailer.js';
import * as authService from '../auth/auth.service.js';

async function getById({ id }) {
  const user = await usersRepository.getById({ id });
  return user;
}

async function sendChangedPawssordEmail({ email }) {
  const { EMAIL_TIMEOUT } = process.env;
  const emailToken = authService.getToken({ userId: email, timeout: EMAIL_TIMEOUT });
  const validatePath = 'http://localhost:3000/auth/validate/';
  const url = validatePath + emailToken;
  await transporter.sendMail({
    to: email,
    subject: 'Confirm your new password',
    html: `<h3>You're almost there!</h3><br><a href=${url}>Click this link to confirm your new password.</a>`,
  });
}

async function patch({ user, allowedChanges }) {
  const { _id } = user;
  if (Object.keys(allowedChanges).includes('password') && (user.password !== allowedChanges.password)) {
    if (!Object.keys(allowedChanges).includes('repeatedPassword')) {
      const error = { msg: 'Please provide a repeatedPassword' };
      return error;
    }
    if (allowedChanges.password !== allowedChanges.repeatedPassword) {
      const error = { msg: 'Both passwords must match.' };
      return error;
    }
    const { email } = user;
    const intSaltOrRoundsHash = parseInt(process.env.SALT_OR_ROUNDS_HASH);
    const hashedPassword = hashSync(allowedChanges.password, intSaltOrRoundsHash);
    const newUserProps = allowedChanges;
    newUserProps.password = hashedPassword;
    newUserProps.validated = false;
    await sendChangedPawssordEmail({ email });
    await usersRepository.patch({ _id, newUserProps });
    const checkMail = { msg: 'Pelase check your email. You need to validate your account after updating your password' };
    return checkMail;
  }
  const updatedUser = await usersRepository.patch({ _id, allowedChanges });
  return updatedUser;
}
async function getByEmail({ email }) {
  const user = await usersRepository.getByEmail({ email });
  return user;
}

async function updateCredit({ user, paymentMethod, total }) {
  const currentCredit = user[paymentMethod];
  if (total > currentCredit) {
    const result = {
      msg: 'Insufficient funds.',
      error: {
        [paymentMethod]: currentCredit,
      },
    };
    return result;
  }
  const updatedUserData = await usersRepository.updateCredit({ user, paymentMethod, total });
  const updatedCredit = updatedUserData[paymentMethod];
  return updatedCredit;
}

export {
  getById,
  patch,
  getByEmail,
  updateCredit,
};
