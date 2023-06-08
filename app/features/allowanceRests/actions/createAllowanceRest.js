import {http} from '../../shared/services';

export const CREATE_ALLOWANCE_REST = 'CREATE_ALLOWANCE_REST';
export const CREATE_ALLOWANCE_REST_PENDING = `${CREATE_ALLOWANCE_REST}_PENDING`;
export const CREATE_ALLOWANCE_REST_FULFILLED = `${CREATE_ALLOWANCE_REST}_FULFILLED`;
export const CREATE_ALLOWANCE_REST_REJECTED = `${CREATE_ALLOWANCE_REST}_REJECTED`;

export function createAllowanceRest(model) {
  return {
    type: CREATE_ALLOWANCE_REST,
    payload: http.post('allowance-rests', model),
  };
}
