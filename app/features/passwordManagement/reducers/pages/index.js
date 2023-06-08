import cancelPasswordReset from './cancelPasswordReset';
import changePassword from './changePassword';
import {combineReducers} from 'redux';
import requestPasswordReset from './requestPasswordReset';
import resetPassword from './resetPassword';
import verifyPasswordResetToken from './verifyPasswordResetToken';

export default combineReducers({
  cancelPasswordReset,
  changePassword,
  requestPasswordReset,
  resetPassword,
  verifyPasswordResetToken,
});
