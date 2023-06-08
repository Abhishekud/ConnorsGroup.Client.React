import React from 'react';
import {
  LogInPage,
  LogOutPage,
  NotAuthorizedPage,
  VerifyUserPage,
  TermsPage,
  TermsReviewPage,
  Authorize,
} from './components';
import {Redirect, Route} from 'react-router';
import {ADMIN_ACCEPT_TERMS} from './constants/permissions';

export default (
  <Route>
    <Route path="verify-user" component={VerifyUserPage} />
    <Redirect from="login" to="log-in" />
    <Route path="log-in" component={LogInPage} />
    <Redirect from="logout" to="log-out" />
    <Route path="log-out" component={LogOutPage} />
    <Route path="terms" component={TermsPage} />
    <Route permissions={[ADMIN_ACCEPT_TERMS]} component={Authorize}>
      <Route path="review-terms" component={TermsReviewPage} />
    </Route>
    <Route path="not-authorized" component={NotAuthorizedPage} />
  </Route>
);
