import {http} from '../../shared/services';

export const IMPORT_USERS = 'IMPORT_USERS';
export const IMPORT_USERS_PENDING = `${IMPORT_USERS}_PENDING`;
export const IMPORT_USERS_FULFILLED = `${IMPORT_USERS}_FULFILLED`;
export const IMPORT_USERS_REJECTED = `${IMPORT_USERS}_REJECTED`;

export function importUsers(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_USERS,
    payload: http.post('users/import', data),
  };
}
