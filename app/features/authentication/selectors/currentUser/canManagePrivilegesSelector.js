import {createSelector} from 'reselect';
import userPermissionsSelector from './userPermissionsSelector';
import {SUPER_ADMIN_MANAGE_PERMISSIONS} from '../../constants/permissions';

export default createSelector(
  userPermissionsSelector,
  permissions => permissions.some(r => r === SUPER_ADMIN_MANAGE_PERMISSIONS));
