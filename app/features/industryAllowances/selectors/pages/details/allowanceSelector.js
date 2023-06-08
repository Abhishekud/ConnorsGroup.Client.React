import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import AllowanceModel from '../../../models/AllowanceModel';

export default createSelector(
  pageSelector,
  page => page.get('allowance') || new AllowanceModel()
);
