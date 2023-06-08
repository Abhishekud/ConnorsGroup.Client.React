import React from 'react';
import {Route} from 'react-router';
import {Authorize} from '../authentication/components';
import {PartFamiliesListPage} from './components';

export default (
  <Route checkParts component={Authorize}>
    <Route path="part-families" component={PartFamiliesListPage} />
  </Route>
);
