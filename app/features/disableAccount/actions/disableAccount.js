import {http} from '../../shared/services';

export const DISABLE_ACCOUNT = 'DISABLE_ACCOUNT';
export const DISABLE_ACCOUNT_PENDING = `${DISABLE_ACCOUNT}_PENDING`;
export const DISABLE_ACCOUNT_FULFILLED = `${DISABLE_ACCOUNT}_FULFILLED`;
export const DISABLE_ACCOUNT_REJECTED = `${DISABLE_ACCOUNT}_REJECTED`;

export function disableAccount(disableAccountToken) {
  return {
    type: DISABLE_ACCOUNT,
    payload: http.put('disable-account', {disableAccountToken}),
  };
}
