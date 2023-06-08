import {http} from '../../shared/services';

export const DELETE_ALLOWANCE = 'DELETE_ALLOWANCE';
export const DELETE_ALLOWANCE_PENDING = `${DELETE_ALLOWANCE}_PENDING`;
export const DELETE_ALLOWANCE_FULFILLED = `${DELETE_ALLOWANCE}_FULFILLED`;
export const DELETE_ALLOWANCE_REJECTED = `${DELETE_ALLOWANCE}_REJECTED`;

export function deleteAllowance(allowanceId) {
  return {
    type: DELETE_ALLOWANCE,
    payload: http.delete(`allowances/${allowanceId}`),
  };
}
