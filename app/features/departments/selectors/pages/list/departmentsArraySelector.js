import {createSelector} from 'reselect';
import departmentsSelector from './departmentsSelector';

export default createSelector(
  departmentsSelector,
  departments => departments.toList().toJS()
);
