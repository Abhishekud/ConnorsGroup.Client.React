import {NotFoundPage, SystemErrorPage} from './components';
import React from 'react';
import {Route} from 'react-router';

export default (
  <Route>
    <Route path="not-found" component={NotFoundPage} />
    <Route path="system-error" component={SystemErrorPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
