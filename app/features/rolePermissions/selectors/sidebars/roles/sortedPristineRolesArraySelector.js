import {createSelector} from 'reselect';
import pristineRolesSelector from './pristineRolesSelector';

export default createSelector(
  pristineRolesSelector,
  pristineRoles => pristineRoles.sortBy(a => a.get('name')).valueSeq()
);
