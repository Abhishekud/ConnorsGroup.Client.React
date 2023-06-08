import {createSelector} from 'reselect';
import userPermissionsSelector from './userPermissionsSelector';
import {CHARACTERISTICS_EDIT} from '../../constants/permissions';

export default createSelector(
  userPermissionsSelector,
  permissions => permissions.some(r => r === CHARACTERISTICS_EDIT));

