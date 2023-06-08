import {createSelector} from 'reselect';
import {roleSelectListOptionsSelector} from '../../../rolePermissions/selectors/selectListOptions';

export default createSelector(
  roleSelectListOptionsSelector,
  roles => roles?.find(role => role.label === 'Admin Only')?.value
);
