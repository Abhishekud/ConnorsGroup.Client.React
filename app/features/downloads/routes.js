import React from 'react';
import {Route} from 'react-router';
import {Downloads, DownloadsListPage} from './components';

export default (
  <Route>
    <Route path="downloads/:id" component={Downloads} />
    <Route path="downloads" component={DownloadsListPage} />
  </Route>
);
