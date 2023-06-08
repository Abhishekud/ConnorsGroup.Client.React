import {http} from '../../shared/services';

export const LOAD_IDENTITY = 'LOAD_IDENTITY';
export const LOAD_IDENTITY_FULFILLED = `${LOAD_IDENTITY}_FULFILLED`;
export const LOAD_IDENTITY_REJECTED = `${LOAD_IDENTITY}_REJECTED`;

export function loadIdentity() {
  return {
    type: LOAD_IDENTITY,
    payload: http.get('current-user/identity'),
  };
}
