import {createSelector} from 'reselect';
import userPermissionsSelector from './userPermissionsSelector';
import {PROFILING_LOCATION_MAPPING_EDIT} from '../../constants/permissions';

export default createSelector(
  userPermissionsSelector,
  permissions => permissions.some(r => r === PROFILING_LOCATION_MAPPING_EDIT));

