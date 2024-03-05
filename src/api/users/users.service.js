import { compareSync } from 'bcrypt';
import * as usersRepository from './users.repository.js';
import transporter from '../nodemailer.js';
import * as authService from '../auth/auth.service.js';

async function getById({ id }) {
  const user = await usersRepository.getById({ id });
  return user;
}

async function sendModificationConfirmation({
  _id,
  dataType,
  sensitiveData,
  email,
}) {
  const { TOKEN_TIMEOUT, SERVER_URL } = process.env;
  const token = authService.getToken({
    userId: { _id, dataType, sensitiveData },
    timeout: TOKEN_TIMEOUT,
  });
  const url = `${SERVER_URL}auth/modifySensitiveData/${token}`;
  // const url = `http://localhost:3000/auth/modifySensitiveData/${token}`;
  await transporter.sendMail({
    to: dataType === 'email' ? sensitiveData : email,
    subject: 'Confirm details change',
    html: `<h3>You're almost there!</h3><br><a href=${url}>Click this link to confirm changes to your account.</a>`,
  });
}

async function patch({ user, newProps }) {
  const { _id } = user;
  if (newProps.email) {
    sendModificationConfirmation({ _id, dataType: 'email', sensitiveData: newProps.email });
    return;
  }
  if (newProps.newPassword) {
    if (!compareSync(newProps.password, user.password)) {
      const passwordError = {
        code: 401,
        msg: 'The current password you entered does not match our records.',
      };
      throw new Error(JSON.stringify(passwordError));
    }
    sendModificationConfirmation({
      _id,
      dataType: 'password',
      sensitiveData: newProps.newPassword,
      email: user.email,
    });
    return;
  }
  await usersRepository.patch({ _id, newProps });
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
