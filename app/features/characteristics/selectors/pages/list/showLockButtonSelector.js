import {createSelector} from 'reselect';
import pageSelector from './pageSelector';


export default createSelector(
  pageSelector,
  page => page.getIn(['showLockButton', page.get('selectedDepartmentId')])
);
