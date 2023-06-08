import {createSelector} from 'reselect';
import userPermissionsSelector from './userPermissionsSelector';
import {STANDARDS_EDIT} from '../../constants/permissions';

export default createSelector(
  userPermissionsSelector,
  permissions => permissions.some(r => r === STANDARDS_EDIT));

