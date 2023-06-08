import React from 'react';
import {Route} from 'react-router';
import {Authorize} from '../authentication/components';
import {STANDARDS_FILING_FIELDS_EDIT} from '../authentication/constants/permissions';
import {StandardFilingFieldOptionsListPage} from './components';

export default (
  <Route path="admin" permissions={[STANDARDS_FILING_FIELDS_EDIT]} component={Authorize}>
    <Route path="standard-filing-field-options" component={StandardFilingFieldOptionsListPage} />
  </Route>
);
