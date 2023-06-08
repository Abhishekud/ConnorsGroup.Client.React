import {createSelector} from 'reselect';
import userPermissionsSelector from './userPermissionsSelector';
import {ELEMENTS_EDIT} from '../../constants/permissions';

export default createSelector(
  userPermissionsSelector,
  permissions => permissions.some(r => r === ELEMENTS_EDIT));

