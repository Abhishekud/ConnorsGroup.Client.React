import {createSelector} from 'reselect';
import userPermissionsSelector from './userPermissionsSelector';
import {PROFILING_ATTRIBUTES_ASSIGN} from '../../constants/permissions';

export default createSelector(
  userPermissionsSelector,
  permissions => permissions.some(r => r === PROFILING_ATTRIBUTES_ASSIGN));

