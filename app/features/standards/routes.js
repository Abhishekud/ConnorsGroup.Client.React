import React from 'react';
import {Route} from 'react-router';
import {StandardProfilePage, StandardsListPage, DownloadBulkExport} from './components';

export default (
  <Route>
    <Route path="standards" component={StandardsListPage} />
    <Route path="standards/download-bulk-export-reports/:id" component={DownloadBulkExport} />
    <Route path="standards/:id" component={StandardProfilePage} />
  </Route>
);
