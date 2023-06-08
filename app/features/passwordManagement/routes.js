import React from 'react';
import {Route} from 'react-router';
import {
  CancelPasswordResetPage,
  ChangePasswordPage,
  RequestPasswordResetPage,
  ResetPasswordPage,
  VerifyPasswordResetTokenPage,
} from './components';

export const nonAuthorizedRoutes =
  <Route>
    <Route path="request-password-reset" component={RequestPasswordResetPage} />
    <Route path="verify-password-reset-token/:passwordResetToken" component={VerifyPasswordResetTokenPage} />
    <Route path="reset-password/:passwordResetToken" component={ResetPasswordPage} />
    <Route path="cancel-password-reset/:passwordResetToken" component={CancelPasswordResetPage} />
  </Route>;

export const authorizedRoutes =
  <Route>
    <Route path="change-password" component={ChangePasswordPage} />
  </Route>;

