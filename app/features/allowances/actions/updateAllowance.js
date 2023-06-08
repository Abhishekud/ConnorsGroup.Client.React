import {http} from '../../shared/services';

export const UPDATE_ALLOWANCE = 'UPDATE_ALLOWANCE';
export const UPDATE_ALLOWANCE_PENDING = `${UPDATE_ALLOWANCE}_PENDING`;
export const UPDATE_ALLOWANCE_FULFILLED = `${UPDATE_ALLOWANCE}_FULFILLED`;
export const UPDATE_ALLOWANCE_REJECTED = `${UPDATE_ALLOWANCE}_REJECTED`;

export function updateAllowance(allowance) {
  return {
    type: UPDATE_ALLOWANCE,
    payload: http.put(`allowances/${allowance.get('id')}`, allowance),
  };
}
