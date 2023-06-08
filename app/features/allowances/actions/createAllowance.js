import {http} from '../../shared/services';

export const CREATE_ALLOWANCE = 'CREATE_ALLOWANCE';
export const CREATE_ALLOWANCE_PENDING = `${CREATE_ALLOWANCE}_PENDING`;
export const CREATE_ALLOWANCE_FULFILLED = `${CREATE_ALLOWANCE}_FULFILLED`;
export const CREATE_ALLOWANCE_REJECTED = `${CREATE_ALLOWANCE}_REJECTED`;

export function createAllowance(model) {
  return {
    type: CREATE_ALLOWANCE,
    payload: http.post('allowances', model),
  };
}
