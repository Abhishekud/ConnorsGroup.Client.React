import {http} from '../../shared/services';

export const DELETE_ALLOWANCE_REST = 'DELETE_ALLOWANCE_REST';
export const DELETE_ALLOWANCE_REST_PENDING = `${DELETE_ALLOWANCE_REST}_PENDING`;
export const DELETE_ALLOWANCE_REST_FULFILLED = `${DELETE_ALLOWANCE_REST}_FULFILLED`;
export const DELETE_ALLOWANCE_REST_REJECTED = `${DELETE_ALLOWANCE_REST}_REJECTED`;

export function deleteAllowanceRest(allowanceRestId) {
  return {
    type: DELETE_ALLOWANCE_REST,
    payload: http.delete(`allowance-rests/${allowanceRestId}`),
  };
}
