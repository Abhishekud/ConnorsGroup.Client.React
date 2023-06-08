import React from 'react';
import {Route} from 'react-router';
import {Authorize} from '../authentication/components';
import {STANDARDS_PARTS_FIELDS_EDIT} from '../authentication/constants/permissions';
import {PartFieldsListPage} from './components';

export default (
  <Route path="admin" permissions={[STANDARDS_PARTS_FIELDS_EDIT]} checkParts component={Authorize}>
    <Route path="part-fields" component={PartFieldsListPage} />
  </Route>
);
