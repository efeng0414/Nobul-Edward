import RecoverEmailComponent from "./recover-email";
import ResetPasswordComponent from "./reset-password";
import VerifyEmailComponent from "./verify-email";
import InvalidActionComponent from "./invalid-action";

export const authActionMap = {
  resetPassword: {
    redirect: true,
    component: ResetPasswordComponent
  },
  recoverEmail: {
    redirect: true,
    component: RecoverEmailComponent
  },
  verifyEmail: {
    redirect: false,
    component: VerifyEmailComponent
  },
  invalidAction: {
    redirect: false,
    component: InvalidActionComponent
  }
};

export const shouldRedirect = ({ mode }) =>
  authActionMap[mode] && authActionMap[mode].redirect;
