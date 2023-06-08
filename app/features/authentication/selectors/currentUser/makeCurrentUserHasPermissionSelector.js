import {createSelector} from 'reselect';
import userPermissionsSelector from './userPermissionsSelector';

export default function (permission) {
  return createSelector(
    userPermissionsSelector,
    permissions => permissions.some(r => r === permission));
}
