import React from 'react';
import {Route} from 'react-router';
import ADAPTExport from './components/ADAPTExport';
import {Authorize} from '../authentication/components';
import {OUTPUTS_ADAPT_EXPORT} from '../authentication/constants/permissions';

export default (
  <Route permissions={[OUTPUTS_ADAPT_EXPORT]} component={Authorize}>
    <Route path="adapt-export" component={ADAPTExport} />
  </Route>
);
