import {http} from '../../shared/services';

export const LOAD_PERMISSION_OPTIONS = 'LOAD_PERMISSION_OPTIONS';
export const LOAD_PERMISSION_OPTIONS_PENDING = `${LOAD_PERMISSION_OPTIONS}_PENDING`;
export const LOAD_PERMISSION_OPTIONS_FULFILLED = `${LOAD_PERMISSION_OPTIONS}_FULFILLED`;
export const LOAD_PERMISSION_OPTIONS_REJECTED = `${LOAD_PERMISSION_OPTIONS}_REJECTED`;

export function loadPermissionOptions() {
  return {
    type: LOAD_PERMISSION_OPTIONS,
    payload: http.get('roles/permission-options'),
  };
}
