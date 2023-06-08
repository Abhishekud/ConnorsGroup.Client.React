import {http} from '../../shared/services';

export const UPDATE_ALLOWANCE_REST = 'UPDATE_ALLOWANCE_REST';
export const UPDATE_ALLOWANCE_REST_PENDING = `${UPDATE_ALLOWANCE_REST}_PENDING`;
export const UPDATE_ALLOWANCE_REST_FULFILLED = `${UPDATE_ALLOWANCE_REST}_FULFILLED`;
export const UPDATE_ALLOWANCE_REST_REJECTED = `${UPDATE_ALLOWANCE_REST}_REJECTED`;

export function updateAllowanceRest(allowanceRest) {
  return {
    type: UPDATE_ALLOWANCE_REST,
    payload: http.put(`allowance-rests/${allowanceRest.get('id')}`, allowanceRest),
  };
}
